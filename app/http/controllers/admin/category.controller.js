const createHttpError = require('http-errors')
const { CategoryModel } = require('../../../models/categories')
const { Controller } = require('../controller')
const {
    addCategorySchema,
    editCategorySchema,
} = require('../../validators/admin/category.validation')
const { default: mongoose, Types } = require('mongoose')

class CategoryController extends Controller {
    async add(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body)
            const { title, parent } = req.body

            const category = await CategoryModel.create({ title, parent })
            if (!category) throw createHttpError.InternalServerError('خطای سرور')
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'دسته بندی با موفقیت افزوده شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.checkExist(id)
            const deletedResult = await CategoryModel.deleteMany({
                $or: [
                    {
                        _id: category._id,
                    },
                    {
                        parent: category._id,
                    },
                ],
            })
            if (deletedResult.deletedCount === 0)
                throw createHttpError.InternalServerError('حذف دسته بندی انجام نشد')

            res.status(200).json({
                message: 'حذف دسته بندی با موفقیت انجام شد',
                statusCode: 200,
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExist(id) {
        if (!mongoose.isValidObjectId(id))
            throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')
        const category = await CategoryModel.findById(id)
        if (!category) throw createHttpError.NotFound('دسته بندی یافت نشد')
        return category
    }
    async edit(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.checkExist(id)

            await editCategorySchema.validateAsync(req.body)

            const { title } = req.body

            const modified = await CategoryModel.updateOne(
                { _id: category._id },
                { $set: { title } }
            )

            if (!modified.acknowledged)
                throw createHttpError.InternalServerError('خطای سرور در فرایند ویرایش دسته بندی')

            res.status(200).json({
                message: 'ویرایش دسته بندی با موفقیت انجام شد',
                statusCode: 200,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.find({}, { __v: 0 })

            res.status(200).json({
                data: {
                    categories,
                    statusCode: 200,
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategoryWithoutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match: {},
                },
                {
                    $project: {
                        __v: 0,
                        parent: 0,
                    },
                },
            ])
            res.status(200).json({
                data: { categories, statusCode: 200 },
            })
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id))
                throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')

            const category = await CategoryModel.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'children',
                    },
                },
                {
                    $project: {
                        __v: 0,
                        'children.__v': 0,
                        'children.parent': 0,
                        parent: 0,
                    },
                },
            ])

            res.status(200).json({
                data: {
                    category,
                    statusCode: 200,
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.aggregate([
                {
                    $match: {
                        parent: undefined,
                    },
                },
                {
                    $project: {
                        __v: 0,
                    },
                },
            ])
            res.status(200).json({
                data: {
                    parents,
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req, res, next) {
        try {
            const { parent } = req.params

            if (!mongoose.isValidObjectId(parent)) {
                throw createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')
            }

            const children = await CategoryModel.find({ parent }, { parent: 0, __v: 0 })
            res.status(200).json({
                data: {
                    children,
                    statusCode: 200,
                },
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { CategoryController: new CategoryController() }
