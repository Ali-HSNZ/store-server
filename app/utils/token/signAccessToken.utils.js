const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/users.model')

const signAccessToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            userID: user._id,
        }
        const secretKey = process.env.TOKEN_SECRET_KEY
        const option = {
            expiresIn: '1h',
        }
        jwt.sign(payload, secretKey, option, (err, token) => {
            if (err) {
                throw reject(createHttpError.InternalServerError('خطای سمت سرور :)'))
            }
            resolve(token)
        })
    })
}

module.exports = { signAccessToken }
