const { StatusCodes } = require('http-status-codes')
const { CourseModel } = require('../../../../models/course')
const { Controller } = require('../../controller')
const path = require('path')
const {
    deleteFileFromPublic,
    copyObject,
    deleteInvalidPropertyInObject,
} = require('../../../../utils')
const { addCourseSchema } = require('../../../validators/admin/course.validation')
const createHttpError = require('http-errors')
const { objectIdValidator } = require('../../../validators/public.validator')
const { deleteFileWithPathHandler } = require('../../../../utils/delete-file-from-public')
const { default: mongoose } = require('mongoose')

const selectUserData = ['mobile', 'first_name', 'last_name']

const populateQueryData = [
    { path: 'category' },
    { path: 'likes', select: selectUserData },
    { path: 'dislikes', select: selectUserData },
    { path: 'teacher', select: selectUserData },
    { path: 'comments.user', select: selectUserData },
    { path: 'comments.answers.user', select: selectUserData },
]

class CourseController extends Controller {
    async getAll(req, res, next) {
        try {
            const search = req?.query?.search || undefined

            let courses = []
            if (search?.trim()?.length > 0) {
                courses = await CourseModel.find({
                    $text: { $search: new RegExp(search, 'ig') },
                }).populate(populateQueryData)
            } else {
                courses = await CourseModel.find({}).sort({ _id: -1 }).populate(populateQueryData)
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
            const courseId = req.params.id
            const { id } = await objectIdValidator.validateAsync({ id: courseId })
            const course = await CourseModel.findById(id).populate(populateQueryData)

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
                status: 'notStarted',
                teacher,
                type,
            })

            if (!createCourseResult) throw createHttpError.InternalServerError('دوره ثبت نشده است')

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'دوره با موفقیت افزوده شد',
                },
            })
        } catch (error) {
            deleteFileFromPublic(req.body.fileUploadPath, req.body.filename)
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params

            const course = await this.checkExistCourse(id)

            const data = copyObject(req.body)

            const { filename, fileUploadPath } = req.body

            const blackList = [
                'chapters',
                'episodes',
                'students',
                'comments',
                'likes',
                'dislikes',
                'bookmarks',
                'filename',
                'fileUploadPath',
            ]

            deleteInvalidPropertyInObject(data, blackList)

            if (req.body.category) {
                if (!mongoose.isValidObjectId(req.body.category))
                    throw createHttpError.BadRequest('شناسه دسته بندی معتبر نیست')
            }

            if (req.file) {
                data.image = path.join(fileUploadPath, filename)
            }

            const updatedCourseResult = await CourseModel.updateOne(
                { _id: id },
                {
                    $set: data,
                }
            )

            if (updatedCourseResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('به روزرسانی دوره انجام نشد')

            // delete old course image if user want set new image for course
            if (req.body.filename) deleteFileWithPathHandler(course.image)

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { message: 'به روزرسانی دوره با موفقیت انجام شد' },
            })
        } catch (error) {
            deleteFileFromPublic(req.body.fileUploadPath, req.body.filename)
            next(error)
        }
    }

    async checkExistCourse(id) {
        await objectIdValidator.validateAsync({ id })

        const course = await CourseModel.findById(id)
        if (!course) throw createHttpError.NotFound('دوره یافت نشد')

        return course
    }
}

module.exports = {
    CourseController: new CourseController(),
}
