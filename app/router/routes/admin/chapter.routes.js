const { ChapterController } = require('../../../http/controllers/admin/course/chapter.controller')

const router = require('express').Router()

// PUT
router.put('/add/:id', ChapterController.addChapter)

module.exports = {
    ChapterRoutes: router,
}
