const { PERMISSIONS } = require('../../../constants')
const { UserController } = require('../../../http/controllers/admin/user/user.controller')
const { checkPermissions } = require('../../../http/middleware/permission.guard')

const router = require('express').Router()

// GET
router.get('/get-all', checkPermissions([PERMISSIONS.ADMIN]), UserController.getAll)
router.get('/profile', UserController.profile)

// PATCH
router.patch('/edit', checkPermissions([PERMISSIONS.ADMIN]), UserController.edit)

module.exports = {
    UserRoutes: router,
}
