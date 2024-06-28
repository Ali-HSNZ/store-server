const createHttpError = require('http-errors')
const redisClient = require('./init-redis')
const jwt = require('jsonwebtoken')

const signRefreshToken = (userMobile) => {
    return new Promise(async (resolve, reject) => {
        const payload = { mobile: userMobile }

        const [secretKey, jwtExpiresIn, redisExpiresIn] = [
            process.env.REFRESH_TOKEN_SECRET_KEY,
            process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
            process.env.REDIS_REFRESH_TOKEN_EXPIRES_IN,
        ]

        jwt.sign(payload, secretKey, { expiresIn: jwtExpiresIn }, async (error, token) => {
            if (error) reject(createHttpError.InternalServerError('خطای سمت سرور'))
            // expires in 1 Year
            await redisClient.SETEX(userMobile, redisExpiresIn, token)
            resolve(token)
        })
    })
}

module.exports = signRefreshToken
