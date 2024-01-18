const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) {
                reject(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            }

            const { mobile } = payload || {}

            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) {
                reject(createHttpError.Unauthorized('حساب کاربری یافت نشد'))
            }

            resolve(mobile)
        })
    })
}

module.exports = { verifyAccessToken }
