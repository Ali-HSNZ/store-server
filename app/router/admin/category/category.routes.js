const { CategoryController } = require('../../../http/controllers/admin/category.controller')

const router = require('express').Router()

router.post('/add', CategoryController.add)
router.get('/parents', CategoryController.getAllParents)
router.get('/children/:parentId', CategoryController.getChildOfParents)
router.get('/', CategoryController.getAll)
router.get('/get-all-without-populate', CategoryController.getAllCategoryWithOutPopulate)
router.delete('/:id', CategoryController.remove)
router.get('/:id', CategoryController.getById)
router.put('/:id', CategoryController.edit)

module.exports = {
    CategoryRoutes: router,
}
