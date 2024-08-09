const {
    listOfImagesFromRequest,
    deleteFileFromPublic,
    copyObject,
    setProductFeatures,
    deleteInvalidPropertyInObject,
} = require('../../../../utils')
const { addProductSchema } = require('../../../validators/admin/product.validation')
const { Controller } = require('../../controller')
const { ProductModel } = require('../../../../models/products')
const { objectIdValidator } = require('../../../validators/public.validator')
const createHttpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const selectUserData = ['mobile', 'first_name', 'last_name']

const populateQueryData = [
    { path: 'category' },
    { path: 'likes', select: selectUserData },
    { path: 'dislikes', select: selectUserData },
    { path: 'supplier', select: selectUserData },
    { path: 'comments.user', select: selectUserData },
    { path: 'comments.answers.user', select: selectUserData },
]

class ProductController extends Controller {
    async add(req, res, next) {
        try {
            let images = []

            if (req.files.length) {
                images = listOfImagesFromRequest(req.body.fileUploadPath, req.files)
            }

            const { title, text, short_text, category, tags, colors, count, price, discount } =
                await addProductSchema.validateAsync(req.body)

            const { feature, type } = setProductFeatures(req.body)

            await ProductModel.create({
                title,
                text,
                colors,
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
                statusCode: StatusCodes.CREATED,
                data: {
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
                data: {
                    message: 'به روز رسانی با موفقیت انجام شد',
                },
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
                data: {
                    message: 'حذف محصول با موفقیت انجام شد',
                },
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
                products = await ProductModel.find({
                    $text: { $search: new RegExp(search, 'ig') },
                }).populate(populateQueryData)
            } else {
                products = await ProductModel.find({}).populate(populateQueryData)
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { products },
            })
        } catch (error) {
            next(error)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await this.findProductById(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { product },
            })
        } catch (error) {
            next(error)
        }
    }
    async findProductById(productId) {
        const { id } = await objectIdValidator.validateAsync({ id: productId })

        const product = await ProductModel.findById(id).populate(populateQueryData)
        if (!id) throw createHttpError.NotFound('محصول یافت نشد')
        return product
    }
}

module.exports = {
    ProductController: new ProductController(),
}
