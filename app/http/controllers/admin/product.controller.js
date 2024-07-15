const { deleteFileInPublic, listOfImagesFromRequest } = require('../../../utils')
const { addProductSchema } = require('../../validators/admin/product.validation')
const { Controller } = require('../controller')
const { ProductModel } = require('../../../models/products')
const path = require('path')

class ProductController extends Controller {
    async add(req, res, next) {
        try {
            const images = listOfImagesFromRequest(req.files, req.body.fileUploadPath)
            const productBody = await addProductSchema.validateAsync(req.body)

            const {
                title,
                text,
                short_text,
                category,
                tags,
                count,
                price,
                discount,
                width,
                height,
                weight,
                length,
                model,
                color,
                madeIn,
            } = productBody

            let feature = {}
            let type = 'physical'

            if (model || madeIn || color || width || height || weight || length) {
                if (!model) feature.model = []
                else feature.model = model

                if (!madeIn) feature.madeIn = ''
                else feature.madeIn = madeIn

                if (!color) feature.color = ''
                else feature.color = color

                if (!width) feature.width = 0
                else feature.width = width
                if (!height) feature.height = 0
                else feature.height = height
                if (!weight) feature.weight = 0
                else feature.weight = weight
                if (!length) feature.length = 0
                else feature.length = length
            } else {
                type = 'virtual'
            }

            await ProductModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                count,
                price,
                discount,
                images,
                supplier: req.user._id,
                feature,
                type,
            })

            res.status(201).json({
                body: {
                    statusCode: 201,
                    message: 'محصول با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            if (req?.body?.image) deleteFileInPublic(req.body.image)
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
            const products = await ProductModel.find({})
            res.status(200).json({
                data: products,
                statusCode: 200,
                message: 'لیست همه محصولات',
            })
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
