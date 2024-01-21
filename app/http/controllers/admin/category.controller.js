const createHttpError = require('http-errors')
const { CategoryModel } = require('../../../models/categories.model')
const Controller = require('../controller')
const { addCategorySchema } = require('../../validators/admin/category.schema')

class CategoryController extends Controller {
    async add(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body)
            const { title, parent } = req.body
            const category = await CategoryModel.create({ title, parent })
            if (!category) {
                throw createHttpError.InternalServerError('خطای داخلی')
            }
            return res.status(201).json({
                statusCode: 201,
                message: 'با موفقیت ایجاد شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.checkExistCategory(id)
            const deleteResult = await CategoryModel.deleteMany({
                $or: [{ _id: category._id }, { parent: category._id }],
            })
            if (deleteResult.deletedCount === 0) {
                throw createHttpError.InternalServerError('حذف دسته بندی انجام نشد')
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'دسته بندی با موفقیت حذف شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            const { id } = req.params
            const { title } = req.body
            await this.checkExistCategory(id)
            const result = await CategoryModel.updateOne({ _id: id }, { $set: { title } })
            if (result.modifiedCount === 0) {
                throw createHttpError.InternalServerError('ویرایش دسته‌بندی انجام نشد')
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'ویرایش دسته‌بندی با موفقیت انجام شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const allCategories = await CategoryModel.find({ parent: undefined }, { __v: 0 })

            return res.status(200).json({
                statusCode: 200,
                data: allCategories,
            })
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params
            const category = await CategoryModel.find({ _id: id }, { __v: 0 })

            return res.status(200).json({
                statusCode: 200,
                data: category,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req, res, next) {
        try {
            const categoryHeads = await CategoryModel.find({ parent: null }, { __v: 0, parent: 0 })
            return res.status(200).json({
                statusCode: 200,
                data: categoryHeads,
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req, res, next) {
        try {
            const { parentId } = req.params
            const children = await CategoryModel.find({ parent: parentId }, { __v: 0, parent: 0 })
            if (children.length) {
                return res.status(200).json({
                    statusCode: 200,
                    data: children,
                })
            }
            return res.status(203).json({
                statusCode: 203,
                data: children,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategoryWithOutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                { $match: {} },
                { $project: { __v: 0, parent: 0 } },
            ])
            return res.status(200).json({
                statusCode: 200,
                data: categories,
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id)
        if (!category) throw createHttpError.NotFound('دسته‌یافت نشد')
        return category
    }
}

module.exports = {
    CategoryController: new CategoryController(),
}
