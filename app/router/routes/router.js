const router = require('express').Router()

const { BlogRoutes } = require('./admin/blog.routes')
const { CategoryRoutes } = require('./admin/category.routes')
const { AuthRoutes } = require('./user/auth.routes')
const { verifyAccessToken, checkRole } = require('../../http/middleware/verifyAccessToken')
const { ProductRoutes } = require('./admin/product.routes')
const { CourseRoutes } = require('./admin/course.routes')
const { ChapterRoutes } = require('./admin/chapter.routes')

// PUBLIC ROUTES
router.use('/auth', AuthRoutes)

// ADMIN ROUTES
router.use('/admin/category', verifyAccessToken, checkRole('ADMIN'), CategoryRoutes)
router.use('/admin/blogs', verifyAccessToken, checkRole('ADMIN'), BlogRoutes)
router.use('/admin/products', verifyAccessToken, checkRole('ADMIN'), ProductRoutes)
router.use('/admin/courses', verifyAccessToken, checkRole('ADMIN'), CourseRoutes)
router.use('/admin/chapters', verifyAccessToken, checkRole('ADMIN'), ChapterRoutes)

module.exports = {
    AllRoutes: router,
}
