const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const signAccessToken = (userMobile) => {
    return new Promise(async (resolve, reject) => {
        const payload = { mobile: userMobile }

        const [secretKey, expiresIn] = [
            process.env.ACCESS_TOKEN_SECRET_KEY,
            process.env.ACCESS_TOKEN_EXPIRES_IN,
        ]

        jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
            if (error) reject(createHttpError.InternalServerError('خطای سمت سرور'))
            resolve(token)
        })
    })
}

module.exports = signAccessToken
