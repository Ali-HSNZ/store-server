const { CategoryRoutes } = require('./admin/category')
const { HomeRoutes } = require('./api')
const { AuthRoutes } = require('./user/auth')

const router = require('express').Router()

router.use('/auth', AuthRoutes)
router.use('/admin/category', CategoryRoutes)
router.use('/', HomeRoutes)

module.exports = {
    AllRoutes: router,
}
