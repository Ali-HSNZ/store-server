const { Router } = require('express')
const { HomeRoutes } = require('./api/index.router')
const { AuthRoutes } = require('./user/auth.router')
const router = Router()

router.use('/', HomeRoutes)
router.use('/user', AuthRoutes)

module.exports = {
    AllRoutes: router,
}
