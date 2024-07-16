const { StatusCodes } = require('http-status-codes')
const { CourseModel } = require('../../../models/course')
const { Controller } = require('../controller')
const path = require('path')
const { deleteFileFromPublic } = require('../../../utils')
const { addCourseSchema } = require('../../validators/admin/course.validation')
const createHttpError = require('http-errors')
const { objectIdValidator } = require('../../validators/public.validator')

class CourseController extends Controller {
    async getAll(req, res, next) {
        try {
            const search = req?.query?.search || undefined

            let courses = []
            if (search?.trim()?.length > 0) {
                courses = await CourseModel.find({ $text: { $search: new RegExp(search, 'ig') } })
            } else {
                courses = await CourseModel.find({}).sort({ _id: -1 })
            }
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { courses },
            })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const productId = req.params.id
            const { id } = await objectIdValidator.validateAsync({ id: productId })
            const course = await CourseModel.findById(id)

            if (!course) throw createHttpError.NotFound('دوره یافت نشد')
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,

                data: { course },
            })
        } catch (error) {
            next(error)
        }
    }

    async add(req, res, next) {
        try {
            await addCourseSchema.validateAsync(req.body)
            const { fileUploadPath, filename } = req.body
            const image = path.join(fileUploadPath, filename).replace(/\\/g, '/')

            const { title, short_text, text, tags, category, price, discount, type } = req.body

            const teacher = req.user._id

            if (Number(price || 0) > 0 && type === 'free')
                throw createHttpError.BadRequest('برای دوره رایگان نمی توان قسمت ثبت کرد')

            const createCourseResult = await CourseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                image,
                time: '00:00:00',
                status: 'notStarted',
                teacher,
                type,
            })

            if (!createCourseResult) throw createHttpError.InternalServerError('دوره ثبت نشده است')

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'دوره با موفقیت انجام شد',
                },
            })
        } catch (error) {
            deleteFileFromPublic(req.body.fileUploadPath, req.body.filename)

            next(error)
        }
    }
}

module.exports = {
    CourseController: new CourseController(),
}
