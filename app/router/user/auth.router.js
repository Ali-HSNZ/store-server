const Router = require('express')
const { UserAuthController } = require('../../http/controllers/user/authentication/auth.controller')
const router = Router()

router.post('/login', UserAuthController.login)

module.exports = {
    AuthRoutes: router,
}
