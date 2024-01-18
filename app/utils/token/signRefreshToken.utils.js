const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')

const signRefreshToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)

        const payload = {
            mobile: user.mobile,
        }

        const options = {
            expiresIn: '1y',
        }
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) {
                reject(createHttpError.InternalServerError('خطای سمت سرور :)'))
            }
            resolve(token)
        })
    })
}

module.exports = { signRefreshToken }
