const createHttpError = require('http-errors')
const { BlogModel } = require('../../../models/blogs.model')
const {
    deleteFileFromPublic,
} = require('../../../utils/delete-file-from-public/delete-file-from-public.utils')
const { addBlogSchema } = require('../../validators/admin/blog.schema')
const Controller = require('../controller')
const path = require('path')
const { Types } = require('mongoose')

class BlogController extends Controller {
    async create(req, res, next) {
        try {
            const validatedData = await addBlogSchema.validateAsync(req.body)
            req.body.image = validatedData.fileUploadPath + '/' + validatedData.filename
            const image = req.body.image
            const author = req.user._id
            const { title, text, short_text, category, tags } = validatedData
            const blog = await BlogModel.create({
                title,
                image,
                text,
                short_text,
                category,
                tags,
                author,
            })
            if (!blog) {
                throw createHttpError.InternalServerError('خطای داخلی سرور')
            }
            return res.json({
                status: 201,
                message: 'بلاگ با موفقیت ایجاد شد',
            })
        } catch (error) {
            deleteFileFromPublic(req.file.path)
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params
            this.isValidId(id)
            const blog = await BlogModel.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                    },
                },
                {
                    $unwind: '$category',
                },
                {
                    $unwind: '$author',
                },

                {
                    $project: {
                        'author.otp': 0,
                        'author.bills': 0,
                        'author.discount': 0,
                        'author.roles': 0,
                        'author.__v': 0,
                        'category.parent': 0,
                        'category.__v': 0,
                    },
                },
            ])

            if (!blog) {
                throw createHttpError.NotFound('بلاگ با این شناسه یافت نشد')
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'OK',
                data: blog,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const blogs = await BlogModel.find({}).populate([
                {
                    path: 'author',
                    select: { otp: 0, __v: 0, bills: 0, discount: 0, roles: 0, _id: 0 },
                },
                {
                    path: 'category',
                },
            ])
            res.status(200).json({ status: 200, data: blogs })
        } catch (error) {
            next(error)
        }
    }
    getCommentsOfBlog(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    deleteById(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    isValidId(id) {
        const validId = Types.ObjectId.isValid(id)
        if (!validId) {
            throw createHttpError.BadRequest('شناسه نامعتبر است')
        }
    }
    updateBlogById(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    BlogController: new BlogController(),
}
