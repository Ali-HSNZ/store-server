const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')

const signAccessToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = { mobile: user.mobile }
        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY
        const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                throw reject(createHttpError.InternalServerError('خطای سمت سرور :)'))
            }
            resolve(token)
        })
    })
}

module.exports = { signAccessToken }
