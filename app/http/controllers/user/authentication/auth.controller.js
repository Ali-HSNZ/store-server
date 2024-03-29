const createHttpError = require('http-errors')
const { getOtpSchema, checkOtpSchema } = require('../../../validators/user/auth.schema')
const { randomNumber } = require('../../../../utils/random-number/random-number.utils')
const { UserModel } = require('../../../../models/users.model')
const Controller = require('../../controller')
const { timeDifference } = require('../../../../utils/time/time-difference.utils')
const moment = require('moment')
const { signAccessToken } = require('../../../../utils/token/signAccessToken.utils')
const { verifyAccessToken } = require('../../../../utils/token/verifyRefreshToken.utils')
const { signRefreshToken } = require('../../../../utils/token/signRefreshToken.utils')
const { CONSTANTS } = require('../../../../utils/constants')

class UserAuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body)
            const { mobile } = req.body
            const otpCode = randomNumber(5)
            const result = await this.saveUser(mobile, otpCode)

            if (!result) {
                throw createHttpError.Unauthorized('ورود شما انجام نشد')
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'کد اعتبارسنجی با موفقیت ارسال شد',
                otp_code: otpCode,
                mobile,
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }

    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const { mobile, code } = req.body
            const user = await UserModel.findOne({ mobile })
            if (!user) {
                throw createHttpError.NotFound('کاربر یافت نشد')
            } else if (+user.otp.code !== +code) {
                throw createHttpError.Unauthorized('کد ارسال شده صحیح نمی‌باشد')
            }
            const { isFutureTime } = timeDifference(user.otp.expiresIn)
            if (!isFutureTime) {
                throw createHttpError.Unauthorized('کد شما منقضی شده است')
            }
            const accessToken = await signAccessToken(user._id)
            const newRefreshToken = await signRefreshToken(user._id)

            return res.json({
                data: { accessToken, refreshToken: newRefreshToken },
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body
            const mobile = await verifyAccessToken(refreshToken)
            const user = await UserModel.findOne({ mobile })
            const accessToken = await signAccessToken(user._id)
            const newRefreshToken = await signRefreshToken(user._id)
            return res.json({
                data: { accessToken, refreshToken: newRefreshToken },
            })
        } catch (error) {
            next(error)
        }
    }

    async saveUser(mobile, code) {
        const user = await this.checkExistUser(mobile)

        let otp = {
            code,
            expiresIn: moment()
                .add(+process.env.USER_EXPIRES_OTP_SECONDS_TIME, 'seconds')
                .valueOf(),
        }
        if (!!user) {
            const { isFutureTime, formattedTime } = timeDifference(user.otp.expiresIn)

            if (isFutureTime) {
                throw createHttpError.BadRequest(
                    `کد اعتبارسنجی پس از گذشت ${formattedTime} ارسال خواهد شد`
                )
            }
            return await this.updateUser(mobile, { otp })
        }
        return await UserModel.create({
            mobile,
            otp,
            roles: [CONSTANTS.ROLES.USER],
        })
    }

    async checkExistUser(mobile) {
        return await UserModel.findOne({ mobile })
    }

    async updateUser(mobile, objData = {}) {
        const updateResult = await UserModel.updateOne({ mobile }, { $set: objData })
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController: new UserAuthController(),
}
