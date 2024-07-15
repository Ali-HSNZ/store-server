const router = require('express').Router()
const { ProductController } = require('../../../http/controllers/admin/product.controller')
const { stringToArray } = require('../../../http/middleware/string-to-array.middleware')
const { uploadFile } = require('../../../utils')

// POST
router.post(
    '/add',
    uploadFile.array('images', 10),
    stringToArray('tags'),
    stringToArray('model'),
    ProductController.add
)
router.get('/get-all', ProductController.getAll)

module.exports = {
    ProductRoutes: router,
}
