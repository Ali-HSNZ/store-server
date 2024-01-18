const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')

const verifyAccessToken = (req, res, next) => {
    const headers = req.headers
    const [bearer, token] = headers?.['access-token']?.split(' ') || []

    if (token && bearer.toLowerCase() === 'bearer') {
        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY

        return jwt.verify(token, secretKey, async (err, payload) => {
            const { mobile } = payload || {}
            if (err) {
                return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            }

            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) {
                throw createHttpError.Unauthorized('حساب کاربری یافت نشد')
            }
            req.user = user
            return next()
        })
    }
    return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
}

module.exports = { verifyAccessToken }
