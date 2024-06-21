const createHttpError = require('http-errors')
const { CategoryModel } = require('../../../models/categories')
const Controller = require('../controller')
const { addCategorySchema } = require('../../validators/admin/category.validation')

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
    remove(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    edit(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    getAll(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    getById(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    getAllParents(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    getChildOfParents(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { CategoryController: new CategoryController() }
