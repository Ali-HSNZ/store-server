const {
    listOfImagesFromRequest,
    deleteFileFromPublic,
    copyObject,
    setProductFeatures,
    deleteInvalidPropertyInObject,
} = require('../../../utils')
const { addProductSchema } = require('../../validators/admin/product.validation')
const { Controller } = require('../controller')
const { ProductModel } = require('../../../models/products')
const { objectIdValidator } = require('../../validators/public.validator')
const createHttpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

class ProductController extends Controller {
    async add(req, res, next) {
        try {
            const images = listOfImagesFromRequest(req.body.fileUploadPath, req.files)
            const productBody = await addProductSchema.validateAsync(req.body)

            const { title, text, short_text, category, tags, count, price, discount } = productBody

            const { feature, type } = setProductFeatures(req.body)

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

            res.status(StatusCodes.CREATED).json({
                body: {
                    statusCode: StatusCodes.CREATED,
                    message: 'محصول با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            deleteFileFromPublic(req.body.fileUploadPath, req.files, true)
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            const { id } = req.params
            await this.findProductById(id)

            const { feature } = setProductFeatures(req.body)
            const data = copyObject({ ...req.body, ...feature })
            data.images = listOfImagesFromRequest(req.body.fileUploadPath, req.files)
            data.feature = feature

            let blackListFields = [
                'likes',
                'dislikes',
                'bookmarks',
                'comments',
                'supplier',
                'width',
                'height',
                'weight',
                'length',
                'fileUploadPath',
                'filename',
            ]

            deleteInvalidPropertyInObject(data, blackListFields)

            const updateProductResult = await ProductModel.updateOne({ _id: id }, { $set: data })

            if (updateProductResult.modifiedCount === 0)
                createHttpError.InternalServerError('خطای سرور')

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data,
                message: 'به روز رسانی با موفقیت انجام شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params
            await this.findProductById(id)
            const deleteProductResult = await ProductModel.deleteOne({ _id: id })

            if (deleteProductResult.deletedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: 'حذف محصول با موفقیت انجام شد',
            })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const search = req?.query?.search || undefined

            let products = []
            if (search?.trim()?.length > 0) {
                products = await ProductModel.find({ $text: { $search: new RegExp(search, 'ig') } })
            } else {
                products = await ProductModel.find({})
            }
            return res.status(StatusCodes.OK).json({
                data: products,
                statusCode: StatusCodes.OK,
                message: 'لیست همه محصولات',
            })
        } catch (error) {
            next(error)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await this.findProductById(id)
            return res.status(200).json({
                statusCode: 200,
                data: product,
            })
        } catch (error) {
            next(error)
        }
    }
    async findProductById(productId) {
        const { id } = await objectIdValidator.validateAsync({ id: productId })
        const product = await ProductModel.findById(id)
        if (!id) throw createHttpError.NotFound('محصول یافت نشد')
        return product
    }
}

module.exports = {
    ProductController: new ProductController(),
}
