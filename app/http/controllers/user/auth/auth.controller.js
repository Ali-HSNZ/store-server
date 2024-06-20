const createHttpError = require('http-errors')
const { authSchema } = require('../../../validators/user/user.vaidation')
const { UserModel } = require('../../../../models/users')
const { USER_ROLE } = require('../../../../utils/constants')
const { otpGenerator } = require('../../../../utils/functions')
const Controller = require('../../controller')

class AuthController extends Controller {
    async login(req, res, next) {
        try {
            // validate req body
            await authSchema.validateAsync(req.body)

            const { mobile } = req.body

            // generate random number
            const code = otpGenerator()

            // if exist user, create user otherwise update user otp
            const result = await this.saveUser(mobile, code)

            // if problem from process throw error
            if (!result) {
                throw createHttpError.Unauthorized('ورود شما با خطا مواجه شد')
            }

            // finally response code and user mobile
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'کد اعتبارسنجی با موفقیت برای شما ارسال شد',
                    code,
                    mobile,
                },
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
    async saveUser(mobile, code) {
        // check exist user from DB
        const isAvailableUser = await this.checkExistUser(mobile)

        // otp template
        const otp = {
            code,
            expiresIn: new Date().getTime() + 120000, // 2 minutes,
        }

        // if user exist from DB, find user with mobile, and update user otp code
        if (isAvailableUser) {
            return await this.updateUser(mobile, { otp })
        }

        // if is not exist, create user with mobile
        const createUser = await UserModel.create({
            mobile,
            otp,
            roles: [USER_ROLE],
        })
        return !!createUser
    }

    // check exist user from DB
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile })
        return !!user
    }

    // update user otp with mobile
    async updateUser(mobile, newOtp) {
        const updateResult = await UserModel.updateOne({ mobile }, { $set: newOtp })
        return !!updateResult.modifiedCount
    }
}

module.exports = { AuthController: new AuthController() }
