const router = require('express').Router()
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken.middleware')
const { AdminBlogRoutes } = require('./blog/blog.routes')
const { CategoryRoutes } = require('./category/category.routes')

router.use('/category', CategoryRoutes)
router.use('/blog', verifyAccessToken, AdminBlogRoutes)

module.exports = {
    AdminRoutes: router,
}
