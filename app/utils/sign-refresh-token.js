const createHttpError = require('http-errors')
const redisClient = require('./init-redis')
const jwt = require('jsonwebtoken')

const signRefreshToken = (userMobile) => {
    return new Promise(async (resolve, reject) => {
        const payload = { mobile: userMobile }
        const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY
        const options = { expiresIn: '1y' }

        jwt.sign(payload, secretKey, options, async (error, token) => {
            if (error) reject(createHttpError.InternalServerError('خطای سمت سرور'))
            // expires in 1 Year
            await redisClient.SETEX(userMobile, 365 * 24 * 60 * 60, token)
            resolve(token)
        })
    })
}

module.exports = signRefreshToken
