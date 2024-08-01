const router = require('express').Router()

const { PERMISSIONS } = require('../../../constants')
const { checkPermissions } = require('../../../http/middleware/permission.guard')
const { verifyAccessToken } = require('../../../http/middleware/verifyAccessToken')

const { BlogRoutes } = require('./routes/blog.routes')
const { CategoryRoutes } = require('./routes/category.routes')
const { ChapterRoutes } = require('./routes/chapter.routes')
const { CourseRoutes } = require('./routes/course.routes')
const { ProductRoutes } = require('./routes/product.routes')
const { EpisodeRoutes } = require('./routes/episode.routes')
const { PermissionsRoutes } = require('./routes/permission.routes')
const { RoleRoutes } = require('./routes/role.routes')
const { UserRoutes } = require('./routes/user.routes')

router.use('/category', verifyAccessToken, checkPermissions([PERMISSIONS.ADMIN]), CategoryRoutes)
router.use('/blogs', verifyAccessToken, checkPermissions([PERMISSIONS.TEACHER]), BlogRoutes)
router.use(
    '/products',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]),
    ProductRoutes
)
router.use('/courses', verifyAccessToken, checkPermissions([PERMISSIONS.TEACHER]), CourseRoutes)
router.use('/chapters', verifyAccessToken, checkPermissions([PERMISSIONS.TEACHER]), ChapterRoutes)
router.use('/episodes', verifyAccessToken, checkPermissions([PERMISSIONS.TEACHER]), EpisodeRoutes)
router.use('/users', verifyAccessToken, UserRoutes)
router.use(
    '/permission',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.ADMIN]),
    PermissionsRoutes
)
router.use('/role', verifyAccessToken, checkPermissions([PERMISSIONS.ADMIN]), RoleRoutes)

module.exports = {
    AdminRoutes: router,
}
