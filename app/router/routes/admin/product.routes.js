const router = require('express').Router()
const { ProductController } = require('../../../http/controllers/admin/product.controller')
const { stringToArray } = require('../../../http/middleware/string-to-array.middleware')
const { uploadFile } = require('../../../utils')

// Get
router.get('/get-all', ProductController.getAll)
router.get('/get-by-id/:id', ProductController.getOne)

// POST
router.post(
    '/add',
    uploadFile.array('images', 10),
    stringToArray('tags'),
    stringToArray('model'),
    stringToArray('colors'),
    ProductController.add
)

// PATCH
router.patch(
    '/edit-by-id/:id',
    uploadFile.array('images', 10),
    stringToArray('tags'),
    stringToArray('model'),
    ProductController.edit
)

//DELETE
router.delete('/delete-by-id/:id', ProductController.remove)

module.exports = {
    ProductRoutes: router,
}
