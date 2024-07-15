const router = require('express').Router()

const { BlogRoutes } = require('./admin/blog.routes')
const { CategoryRoutes } = require('./admin/category.routes')
const { AuthRoutes } = require('./user/auth.routes')
const { verifyAccessToken, checkRole } = require('../../http/middleware/verifyAccessToken')
const { ProductRoutes } = require('./admin/product.routes')

router.use('/auth', AuthRoutes)
router.use('/admin/category', verifyAccessToken, checkRole('ADMIN'), CategoryRoutes)
router.use('/admin/blogs', verifyAccessToken, checkRole('ADMIN'), BlogRoutes)
router.use('/admin/products', verifyAccessToken, checkRole('ADMIN'), ProductRoutes)

module.exports = {
    AllRoutes: router,
}
