const createHttpError = require('http-errors')
const { CourseModel } = require('../../../../models/course')
const { objectIdValidator } = require('../../../validators/public.validator')
const { Controller } = require('../../controller')
const { StatusCodes } = require('http-status-codes')

class ChapterController extends Controller {
    async addChapter(req, res, next) {
        try {
            const { id } = req.params

            await this.checkCourseExist(id)

            const { title, text } = req.body

            const chapterResult = await CourseModel.updateOne(
                { _id: id },
                {
                    $push: {
                        chapters: {
                            title,
                            text,
                            episode: [],
                        },
                    },
                }
            )
            if (chapterResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فصل ایجاد نشد')

            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'فصل با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async checkCourseExist(courseId) {
        const { id } = await objectIdValidator.validateAsync({ id: courseId })
        const course = await CourseModel.findById(id)
        if (!course) throw createHttpError.NotFound('دوره یافت نشد')
    }
}

module.exports = {
    ChapterController: new ChapterController(),
}
