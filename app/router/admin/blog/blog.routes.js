const { BlogController } = require('../../../http/controllers/admin/blog.controller')
const { stringToArray } = require('../../../http/middlewares/stringToArray.middleware')
const { uploadFile } = require('../../../utils/multer/multer.utils')

const router = require('express').Router()

router.post('/add', uploadFile.single('image'), stringToArray('tags'), BlogController.create)
router.get('/', BlogController.getAll)
router.get('/:id', BlogController.getById)

module.exports = {
    AdminBlogRoutes: router,
}
