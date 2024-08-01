const router = require('express').Router()

const { BlogRoutes } = require('./admin/blog.routes')
const { CategoryRoutes } = require('./admin/category.routes')
const { AuthRoutes } = require('./user/auth.routes')
const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken')
const { ProductRoutes } = require('./admin/product.routes')
const { CourseRoutes } = require('./admin/course.routes')
const { ChapterRoutes } = require('./admin/chapter.routes')
const { EpisodeRoutes } = require('./admin/episode.routes')
const { UserRoutes } = require('./admin/user.routes')
const { PermissionsRoutes } = require('./admin/permission.routes')
const { RoleRoutes } = require('./admin/role.routes')
const { checkPermissions } = require('../../http/middleware/permission.guard')
const { PERMISSIONS } = require('../../constants')
const { graphqlHTTP } = require('express-graphql')
const { graphqlConfig } = require('../../config/graphql.config')

// PUBLIC ROUTES
router.use('/auth', AuthRoutes)

router.use('/graphql', graphqlHTTP(graphqlConfig))

// ADMIN ROUTES
router.use(
    '/admin/category',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.ADMIN]),
    CategoryRoutes
)
router.use('/admin/blogs', verifyAccessToken, checkPermissions([PERMISSIONS.TEACHER]), BlogRoutes)
router.use(
    '/admin/products',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]),
    ProductRoutes
)
router.use(
    '/admin/courses',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.TEACHER]),
    CourseRoutes
)
router.use(
    '/admin/chapters',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.TEACHER]),
    ChapterRoutes
)
router.use(
    '/admin/episodes',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.TEACHER]),
    EpisodeRoutes
)
router.use('/admin/users', verifyAccessToken, UserRoutes)
router.use(
    '/admin/permission',
    verifyAccessToken,
    checkPermissions([PERMISSIONS.ADMIN]),
    PermissionsRoutes
)
router.use('/admin/role', verifyAccessToken, checkPermissions([PERMISSIONS.ADMIN]), RoleRoutes)

module.exports = {
    AllRoutes: router,
}
