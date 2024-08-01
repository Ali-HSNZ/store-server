const router = require('express').Router()

const {
    ChapterController,
} = require('../../../../http/controllers/admin/course/chapter.controller')

// GET
router.get('/get-all/:id', ChapterController.chaptersOfCourse)

// PUT
router.post('/add/:id', ChapterController.addChapter)

// PATCH
router.patch('/edit-by-id/:id', ChapterController.updateChapterById)

// DELETE
router.delete('/remove/:id', ChapterController.remove)

module.exports = {
    ChapterRoutes: router,
}
