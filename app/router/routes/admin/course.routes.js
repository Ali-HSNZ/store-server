const router = require('express').Router()
const { CourseController } = require('../../../http/controllers/admin/course.controller')
const { stringToArray } = require('../../../http/middleware/string-to-array.middleware')
const { uploadFile } = require('../../../utils')

// GET
router.get('/get-all', CourseController.getAll)
router.get('/get-by-id/:id', CourseController.getById)

// POST
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.add)

module.exports = {
    CourseRoutes: router,
}
