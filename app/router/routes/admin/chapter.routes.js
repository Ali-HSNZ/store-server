const { ChapterController } = require('../../../http/controllers/admin/course/chapter.controller')

const router = require('express').Router()

// GET
router.get('/get-all/:id', ChapterController.chaptersOfCourse)

// PUT
router.put('/add/:id', ChapterController.addChapter)

module.exports = {
    ChapterRoutes: router,
}
