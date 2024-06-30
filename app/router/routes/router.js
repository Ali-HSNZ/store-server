const { BlogRoutes } = require('./admin/blog.routes')
const { CategoryRoutes } = require('./admin/category.routes')
const { HomeRoutes } = require('./api/home.routes')
const { AuthRoutes } = require('./user/auth.routes')
const { verifyAccessToken, checkRole } = require('../../http/middleware/verifyAccessToken')
const router = require('express').Router()

router.use('/auth', AuthRoutes)
router.use('/admin/category', verifyAccessToken, checkRole('ADMIN'), CategoryRoutes)
router.use('/admin/blogs', verifyAccessToken, checkRole('ADMIN'), BlogRoutes)
// router.use('/', HomeRoutes)

module.exports = {
    AllRoutes: router,
}
