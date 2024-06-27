const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

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

module.exports = signAccessToken
