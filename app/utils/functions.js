const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/users')

const otpGenerator = () => {
    return Math.floor(Math.random() * 90000 + 10000)
}
const signAccessToken = (userMobile) => {
    return new Promise(async (resolve, reject) => {
        const payload = { mobile: userMobile }
        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY
        const options = { expiresIn: '1h' }

        jwt.sign(payload, secretKey, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError('خطای سمت سرور'))
            resolve(token)
        })
    })
}

const signRefreshToken = (userMobile) => {
    return new Promise(async (resolve, reject) => {
        const payload = { mobile: userMobile }
        const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY
        const options = { expiresIn: '1y' }

        jwt.sign(payload, secretKey, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError('خطای سمت سرور'))
            resolve(token)
        })
    })
}

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

            resolve(user.mobile)
        })
    })
}

module.exports = {
    otpGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
}
