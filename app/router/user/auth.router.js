const Router = require('express')
const { UserAuthController } = require('../../http/controllers/user/authentication/auth.controller')
const router = Router()

router.post('/get-otp', UserAuthController.getOtp)
router.post('/check-otp', UserAuthController.checkOtp)

module.exports = {
    AuthRoutes: router,
}
