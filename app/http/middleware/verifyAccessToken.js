const createHttpError = require('http-errors')
const { UserModel } = require('../../models/users')
const jwt = require('jsonwebtoken')

const verifyAccessToken = (req, res, next) => {
    // get token from request header
    const [bearer, token] = req.headers?.['access-token']?.split(' ') || []

    if (token && bearer.toLowerCase() === 'bearer') {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            // check initial error
            if (err) return next(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))

            // find user from DB with mobile
            const user = await UserModel.findOne(
                { mobile: payload.mobile },
                { mobile: 1, roles: 1 }
            )

            //  if not Exist User throw error
            if (!user) return next(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))

            // save user info to req
            req.user = user
        })

        // everything is ok
        return next()
    }
    return next(createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید'))
}

module.exports = { verifyAccessToken }
