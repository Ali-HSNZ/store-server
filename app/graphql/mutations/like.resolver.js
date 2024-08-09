const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')
const { ProductModel } = require('../../models/products')
const { StatusCodes } = require('http-status-codes')
const { default: mongoose } = require('mongoose')
const createHttpError = require('http-errors')

const LikeProduct = {
    type: PublicResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { productId } = args

        if (!mongoose.isValidObjectId(productId))
            throw createHttpError.BadRequest('شناسه محصول معتبر نیست')

        // find product
        const product = await ProductModel.findById(productId)

        if (!product) throw createHttpError.NotFound('محصول یافت نشد')

        const likedProduct = await ProductModel.findOne({ _id: productId, likes: user._id })
        const dislikedProduct = await ProductModel.findOne({ _id: productId, dislikes: user._id })

        const updateQuery = likedProduct
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await ProductModel.updateOne({ _id: productId }, updateQuery)

        if (dislikedProduct && !likedProduct) {
            await ProductModel.updateOne({ _id: productId }, { $pull: { dislikes: user._id } })
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: 'پسندیدن محصول با موفقیت انجام شد',
            },
        }
    },
}

const likeCourse = {
    type: PublicResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { courseId } = args
    },
}

const likeBlog = {
    type: PublicResponseType,
    args: {
        blogId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { blogId } = args
    },
}

module.exports = { LikeProduct }
