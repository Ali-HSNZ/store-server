const createHttpError = require('http-errors')
const { UserModel } = require('../models/users')
const redisClient = require('./init-redis')
const jwt = require('jsonwebtoken')

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            // check initial error
            if (err) reject(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))

            // find user from DB with mobile
            const user = await UserModel.findOne(
                { mobile: payload?.mobile },
                { mobile: 1, roles: 1 }
            )

            //  if not Exist User throw error
            if (!!!user)
                return reject(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))

            const refreshToken = await redisClient.get(user.mobile)
            if (token === refreshToken) return resolve(user.mobile)
            reject(createHttpError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'))
        })
    })
}

module.exports = verifyRefreshToken
