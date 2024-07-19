const router = require('express').Router()

const { EpisodeController } = require('../../../http/controllers/admin/course/episode.controller')
const { uploadVideo } = require('../../../utils')

// POST
router.post('/add/:courseId/:chapterId', uploadVideo.single('video'), EpisodeController.add)

// DELETE
router.delete('/remove/:id', EpisodeController.remove)

module.exports = {
    EpisodeRoutes: router,
}
