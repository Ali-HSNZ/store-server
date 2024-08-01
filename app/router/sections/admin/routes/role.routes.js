const router = require('express').Router()

const { RoleController } = require('../../../../http/controllers/admin/RBAC/role.controller')
const { stringToArray } = require('../../../../http/middleware/string-to-array.middleware')

// GET
router.get('/get-all', RoleController.getAll)

// POST
router.post('/add', stringToArray('permissions'), RoleController.add)

// PATCH
router.patch('/edit-by-id/:id', stringToArray('permissions'), RoleController.edit)

// DELETE
router.delete('/remove/:field', RoleController.remove)

module.exports = {
    RoleRoutes: router,
}
