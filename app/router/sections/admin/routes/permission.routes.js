const router = require('express').Router()

const {
    PermissionController,
} = require('../../../../http/controllers/admin/RBAC/permission.controller')

// GET
router.get('/get-all', PermissionController.getAll)

// POST
router.post('/add', PermissionController.add)

// PATCH
router.post('/edit-by-id', PermissionController.edit)

// DELETE
router.delete('/remove/:id', PermissionController.remove)

module.exports = { PermissionsRoutes: router }
