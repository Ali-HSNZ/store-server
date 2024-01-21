const router = require('express').Router()
const { HomeRoutes } = require('./api/index.routes')
const { DeveloperRoutes } = require('./developer/developer.routes')
const { AuthRoutes } = require('./user/auth.routes')

router.use('/', HomeRoutes)
router.use('/user', AuthRoutes)
router.use('/developer', DeveloperRoutes)

module.exports = {
    AllRoutes: router,
}
