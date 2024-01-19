const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')
const redisClient = require('../redis/init.redis')

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) {
                return reject(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            }

            const { mobile } = payload || {}

            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) {
                return reject(createHttpError.Unauthorized('حساب کاربری یافت نشد'))
            }

            const refreshToken = await redisClient.get(user._id.toString())

            if (token === refreshToken) return resolve(mobile)
            return reject(createHttpError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'))
        })
    })
}

module.exports = { verifyAccessToken }
