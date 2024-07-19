const path = require('path')
const { addEpisodeSchema } = require('../../../validators/admin/course.validation')
const { Controller } = require('../../controller')

const { default: getVideoDurationInSeconds } = require('get-video-duration')
const { getVideoTime, deleteFileFromPublic } = require('../../../../utils')
const { CourseModel } = require('../../../../models/course')
const createHttpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const { default: mongoose } = require('mongoose')
const { objectIdValidator } = require('../../../validators/public.validator')

class EpisodeController extends Controller {
    async add(req, res, next) {
        try {
            const { chapterId, courseId } = req.params

            await this.checkExistCourseAndChapter({ chapterId, courseId })

            const { title, text, type, filename, fileUploadPath } =
                await addEpisodeSchema.validateAsync(req.body)

            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, '/')
            const videoUrl = `${process.env.APPLICATION_BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`

            const seconds = await getVideoDurationInSeconds(videoUrl)

            const time = getVideoTime(seconds)

            const addEpisodeResult = await CourseModel.updateOne(
                {
                    _id: courseId,
                    'chapters._id': chapterId,
                },
                {
                    $push: {
                        'chapters.$.episodes': { title, text, type, time, videoAddress },
                    },
                }
            )

            if (addEpisodeResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'اپیزود با موفقیت افزوده شد',
                },
            })
        } catch (error) {
            deleteFileFromPublic(req.body.fileUploadPath, req.body.filename)
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params

            await objectIdValidator.validateAsync({ id })

            const removeEpisodeResult = await CourseModel.updateOne(
                {
                    'chapters.episodes._id': id,
                },
                {
                    $pull: {
                        'chapters.$.episodes': {
                            _id: id,
                        },
                    },
                }
            )

            if (removeEpisodeResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'حذف اپیزود با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async checkExistCourseAndChapter({ courseId, chapterId }) {
        // check valid course id
        if (!mongoose.isValidObjectId(courseId))
            throw createHttpError.BadRequest('شناسه دوره نامعتبر است')

        // check exist course
        const existCourse = await CourseModel.findById(courseId)
        if (!existCourse) throw createHttpError.NotFound('دوره یافت نشد')

        // check valid chapter id
        if (!mongoose.isValidObjectId(chapterId))
            throw createHttpError.BadRequest('شناسه فصل نامعتبر است')

        // check exist chapter with course id and chapter id
        const existChapter = await CourseModel.findOne({
            _id: courseId,
            'chapters._id': chapterId,
        })
        if (!existChapter) throw createHttpError.NotFound('فصل یافت نشد')

        return true
    }
}

module.exports = {
    EpisodeController: new EpisodeController(),
}
