const router = require('express').Router()

const { BlogRoutes } = require('./admin/blog.routes')
const { CategoryRoutes } = require('./admin/category.routes')
const { AuthRoutes } = require('./user/auth.routes')
const { verifyAccessToken, checkRole } = require('../../http/middleware/verifyAccessToken')
const { ProductRoutes } = require('./admin/product.routes')
const { CourseRoutes } = require('./admin/course.routes')
const { ChapterRoutes } = require('./admin/chapter.routes')
const { EpisodeRoutes } = require('./admin/episode.routes')
const { UserRoutes } = require('./admin/user.routes')
const { PermissionsRoutes } = require('./admin/permission.routes')
const { RoleRoutes } = require('./admin/role.routes')

// PUBLIC ROUTES
router.use('/auth', AuthRoutes)

// ADMIN ROUTES
router.use('/admin/category', verifyAccessToken, checkRole('ADMIN'), CategoryRoutes)
router.use('/admin/blogs', verifyAccessToken, checkRole('ADMIN'), BlogRoutes)
router.use('/admin/products', verifyAccessToken, checkRole('ADMIN'), ProductRoutes)
router.use('/admin/courses', verifyAccessToken, checkRole('ADMIN'), CourseRoutes)
router.use('/admin/chapters', verifyAccessToken, checkRole('ADMIN'), ChapterRoutes)
router.use('/admin/episodes', verifyAccessToken, checkRole('ADMIN'), EpisodeRoutes)
router.use('/admin/users', verifyAccessToken, checkRole('ADMIN'), UserRoutes)
router.use('/admin/permission', verifyAccessToken, checkRole('ADMIN'), PermissionsRoutes)
router.use('/admin/role', verifyAccessToken, checkRole('ADMIN'), RoleRoutes)

module.exports = {
    AllRoutes: router,
}
