const createHttpError = require('http-errors')
const { checkOtpSchema, getOtpSchema } = require('../../../validators/user/user.validation')
const { UserModel } = require('../../../../models/users')
const { Controller } = require('../../controller')
const {
    otpGenerator,
    signRefreshToken,
    signAccessToken,
    verifyRefreshToken,
} = require('../../../../utils')
const { USER_ROLE } = require('../../../../constants')
const { StatusCodes } = require('http-status-codes')
class AuthController extends Controller {
    async checkOTP(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const { mobile, code } = req.body

            const user = await UserModel.findOne({ mobile })

            if (!user) throw createHttpError.NotFound('کاربر یافت نشد')

            if (user.otp.code != code)
                throw createHttpError.Unauthorized('کد ارسال شده صحیح نمی باشد')

            if (+user.otp.expiresIn < Date.now())
                throw createHttpError.Unauthorized('کد شما منقضی شده است')

            const accessToken = await signAccessToken(user.mobile)
            const refreshToken = await signRefreshToken(user.mobile)

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    accessToken,
                    refreshToken,
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const mobile = await verifyRefreshToken(req.body.refreshToken)
            const user = await UserModel.findOne({ mobile })
            const accessToken = await signAccessToken(user.mobile)
            const newRefreshToken = await signRefreshToken(user.mobile)

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async getOTP(req, res, next) {
        try {
            // validate req body
            await getOtpSchema.validateAsync(req.body)

            const { mobile } = req.body

            // generate random number
            const code = otpGenerator()

            // if exist user, create user otherwise update user otp
            const result = await this.saveUser(mobile, code)

            // if problem from process, throw error
            if (!result) {
                throw createHttpError.Unauthorized('ورود شما با خطا مواجه شد')
            }

            // finally response code and user mobile
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
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
