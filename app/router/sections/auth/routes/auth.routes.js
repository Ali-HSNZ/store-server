const router = require('express').Router()

const { AuthController } = require('../../../../http/controllers/user/auth/auth.controller')

router.post('/get-otp', AuthController.getOTP)
router.post('/check-otp', AuthController.checkOTP)
router.post('/refresh-token', AuthController.refreshToken)

module.exports = {
    AuthRoutes: router,
}
