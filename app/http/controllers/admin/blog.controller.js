const path = require('path')
const { addBlogSchema } = require('../../validators/admin/blog.validation')
const { Controller } = require('../controller')
const { BlogModel } = require('../../../models/blogs')
const { deleteFileInPublic } = require('../../../utils')
const { default: mongoose } = require('mongoose')
const createHttpError = require('http-errors')

class BlogController extends Controller {
    async create(req, res, next) {
        try {
            const blogData = await addBlogSchema.validateAsync(req.body)
            req.body.image = path
                .join(blogData.fileUploadPath, blogData.filename)
                .replace(/\\/g, '/')

            const { title, text, short_text, category, tags } = blogData

            const author = req.user._id
            const image = req.body.image

            await BlogModel.create({
                title,
                image,
                text,
                short_text,
                category,
                tags,
                author,
            })

            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'مقاله با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            if (req?.body?.image) deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params

            if (!mongoose.isValidObjectId(id))
                throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')

            const blog = await this.findBlog({ _id: id })

            res.status(200).json({
                data: {
                    blog,
                },
                statusCode: 200,
            })
        } catch (error) {
            next(error)
        }
    }

    async findBlog(query = {}) {
        const blog = await BlogModel.findOne(query).populate([
            { path: 'category' },
            { path: 'author', select: ['mobile', 'first_name', 'last_name', 'username'] },
        ])
        if (!blog) throw createHttpError.NotFound('مقاله یافت نشد')
        return blog
    }

    async getAll(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {},
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
                    $unwind: '$author',
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
                    $project: {
                        'author.otp': 0,
                        'author.bills': 0,
                        'author.discount': 0,
                        'author.__v': 0,
                        'category.__v': 0,
                        'author.roles': 0,
                    },
                },
            ])
            res.status(200).json({
                data: { blogs, statusCode: 200 },
            })
        } catch (error) {
            next(error)
        }
    }
    async getComments(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            const { id } = req.params

            const data = req.body

            if (!mongoose.isValidObjectId(id))
                throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')

            await this.findBlog({ _id: id })

            if (req.body?.fileUploadPath && req.body?.filename) {
                req.body.image = path
                    .join(req.body.fileUploadPath, req.body.filename)
                    .replace(/\\/g, '/')
            }

            let badData = ['', ' ', '0', null, undefined]
            let blackListFields = ['likes', 'dislikes', 'bookmarks', 'comments', 'author']

            Object.keys(data).forEach((key) => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] === 'string') data[key] = data[key].trim()
                if (Array.isArray(data[key]) && Array.length > 0)
                    data[key] = data[key].map((item) => item.trim())
                if (badData.includes(data[key])) delete data[key]
            })

            const updateResult = await BlogModel.updateOne(
                {
                    _id: id,
                },
                { $set: data }
            )

            if (updateResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('به روزرسانی انجام نشد')

            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'به روزرسانی مقاله موفقیت انجام شد',
                },
            })
        } catch (error) {
            if (req?.body?.image) deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params

            if (!mongoose.isValidObjectId(id))
                throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')

            await this.findBlog({ _id: id })

            const result = await BlogModel.deleteOne({ _id: id })

            if (result.deletedCount === 0)
                throw createHttpError.InternalServerError('حذف مقاله انجام نشد')

            res.status(200).json({
                statusCode: 200,
                message: 'مقاله با موفقیت حذف شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async updateById(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { BlogController: new BlogController() }
