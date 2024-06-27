const { CategoryController } = require('../../../http/controllers/admin/category.controller')

const router = require('express').Router()

// GET
router.get('/parents', CategoryController.getAllParents)
router.get('/get-all', CategoryController.getAll)
router.get('/list-of-all', CategoryController.getAllCategoryWithoutPopulate)
router.get('/children/:parent', CategoryController.getChildOfParents)
router.get('/get-by-id/:id', CategoryController.getById)

// POST
router.post('/add', CategoryController.add)

// PATCH
router.patch('/edit-by-id/:id', CategoryController.edit)

// DELETE
router.delete('/remove/:id', CategoryController.remove)

module.exports = {
    CategoryRoutes: router,
}
