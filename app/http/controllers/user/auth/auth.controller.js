const createHttpError = require('http-errors')
const { authSchema } = require('../../../validators/user/user.vaidation')
const { UserModel } = require('../../../../models/users')
const { USER_ROLE } = require('../../../../utils/constants')
const { otpGenerator } = require('../../../../utils/functions')
const Controller = require('../../controller')

class AuthController extends Controller {
    async login(req, res, next) {
        try {
            await authSchema.validateAsync(req.body)
            const { mobile } = req.body
            const code = otpGenerator()
            const result = await this.saveUser(mobile, code)

            if (!result) {
                throw createHttpError.Unauthorized('ورود شما با خطا مواجه شد!')
            }

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
        const isAvailableUser = await this.checkExistUser(mobile)
        const otp = {
            code,
            expiresIn: new Date().getTime() + 120000,
        }
        if (isAvailableUser) {
            return await this.updateUser(mobile, { otp })
        }
        const createUser = await UserModel.create({
            mobile,
            otp,
            roles: [USER_ROLE],
        })
        return !!createUser
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile })
        return !!user
    }
    async updateUser(mobile, objectData) {
        const badData = ['', ' ', 0, null, undefined, '0', NaN]
        Object.keys(objectData).forEach((key) => {
            if (badData.includes(objectData[key])) {
                delete objectData[key]
            }
        })
        const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
        return !!updateResult.modifiedCount
    }
}

module.exports = { AuthController: new AuthController() }
