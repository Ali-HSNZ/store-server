const router = require('express').Router()

const { EpisodeController } = require('../../../http/controllers/admin/course/episode.controller')
const { uploadVideo } = require('../../../utils')

router.post('/add/:courseId/:chapterId', uploadVideo.single('video'), EpisodeController.add)

module.exports = {
    EpisodeRoutes: router,
}
