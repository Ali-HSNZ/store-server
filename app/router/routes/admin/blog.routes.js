const { BlogController } = require('../../../http/controllers/admin/blog/blog.controller')
const { uploadFile } = require('../../../utils')
const router = require('express').Router()
const { stringToArray } = require('../../../http/middleware/string-to-array.middleware')

// GET
router.get('/get-all', BlogController.getAll)
router.get('/get-by-id/:id', BlogController.getById)

// POST
router.post('/add', uploadFile.single('image'), stringToArray('tags'), BlogController.create)

// PATCH
router.patch(
    '/edit-by-id/:id',
    uploadFile.single('image'),
    stringToArray('tags'),
    BlogController.edit
)

// DELETE
router.delete('/remove/:id', BlogController.deleteById)

module.exports = {
    BlogRoutes: router,
}
