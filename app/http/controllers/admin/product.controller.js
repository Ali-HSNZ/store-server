const { addProductSchema } = require('../../validators/admin/product.validation')
const { Controller } = require('../controller')

class ProductController extends Controller {
    async add(req, res, next) {
        try {
            const productBody = await addProductSchema.validateAsync(req.body)
            res.json({ productBody })
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
    async getOne(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductController: new ProductController(),
}
