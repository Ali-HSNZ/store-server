const router = require('express').Router()
const { ProductController } = require('../../../http/controllers/admin/product.controller')
const { stringToArray } = require('../../../http/middleware/string-to-array.middleware')
const { uploadFile } = require('../../../utils')

// POST
router.post('/add', uploadFile.single('image'), stringToArray('tags'), ProductController.add)

module.exports = {
    ProductRoutes: router,
}
