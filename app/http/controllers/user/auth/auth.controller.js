const createHttpError = require('http-errors')
const { authSchema } = require('../../../validators/user/user.vaidation')

class AuthController {
    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).json({
                message: 'ورود شما با موفقیت انجام شد',
                data: result,
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
}

module.exports = { AuthController: new AuthController() }
