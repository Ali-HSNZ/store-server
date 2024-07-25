const { UserController } = require('../../../http/controllers/admin/user/user.controller')

const router = require('express').Router()

// GET
router.get('/get-all', UserController.getAll)
router.get('/profile', UserController.profile)

// PATCH
router.patch('/edit', UserController.edit)

module.exports = {
    UserRoutes: router,
}
