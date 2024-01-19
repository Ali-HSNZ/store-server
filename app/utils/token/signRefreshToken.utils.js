const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')
const redisClient = require('../redis/init.redis')

const signRefreshToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)

        const payload = {
            mobile: user.mobile,
        }

        const options = {
            expiresIn: '1y',
        }
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) {
                return reject(createHttpError.InternalServerError('خطای سمت سرور :)'))
            }
            await redisClient.SETEX(user._id.toString(), 365 * 24 * 60 * 60, token)
            return resolve(token)
        })
    })
}

module.exports = { signRefreshToken }
