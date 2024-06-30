const createHttpError = require('http-errors')
const { UserModel } = require('../../models/users')
const jwt = require('jsonwebtoken')

// get token from request header
const getToken = (headers) => {
    const [bearer, token] = headers?.['access-token']?.split(' ') || []

    if (token && bearer.toLowerCase() === 'bearer') return token
    throw createHttpError.Unauthorized('حساب کاربری شناسایی نشد. وارد حساب کاربری خود شوید')
}

const verifyAccessToken = (req, res, next) => {
    try {
        const token = getToken(req.headers)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                // check initial error
                if (err) throw createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید')

                // find user from DB with mobile
                const user = await UserModel.findOne(
                    { mobile: payload.mobile },
                    { mobile: 1, roles: 1 }
                )

                //  if not Exist User throw error
                if (!user) throw createHttpError.Unauthorized('مجددا وارد حساب کاربری خود شوید')

                // save user info to req
                req.user = user

                // everything is ok
                return next()
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

const checkRole = (role) => {
    return (req, res, next) => {
        try {
            const user = req.user
            if (user.roles.includes(role)) return next()
            throw createHttpError.Forbidden('شما به این قسمت دسترسی ندارید')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { verifyAccessToken, checkRole }
