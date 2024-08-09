const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')
const { BlogModel } = require('../../models/blogs')

const { StatusCodes } = require('http-status-codes')
const { checkExistProduct, checkExistCourse, checkExistBlog } = require('../utils/functions.utils')

const LikeProductResolver = {
    type: PublicResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { productId } = args
        await checkExistProduct(productId)

        const likedProduct = await ProductModel.findOne({ _id: productId, likes: user._id })
        const dislikedProduct = await ProductModel.findOne({ _id: productId, dislikes: user._id })

        const updateQuery = likedProduct
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await ProductModel.updateOne({ _id: productId }, updateQuery)

        if (!likedProduct && dislikedProduct) {
            await ProductModel.updateOne({ _id: productId }, { $pull: { dislikes: user._id } })
        }

        const responseMessage = likedProduct
            ? 'پسندیدن محصول لغو شد'
            : 'پسندیدن محصول با موفقیت انجام شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const LikeCourseResolver = {
    type: PublicResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { courseId } = args
        await checkExistCourse(courseId)

        const likedCourse = await CourseModel.findOne({ _id: courseId, likes: user._id })
        const dislikedCourse = await CourseModel.findOne({ _id: courseId, dislikes: user._id })

        const updateQuery = likedCourse
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await CourseModel.updateOne({ _id: courseId }, updateQuery)

        if (!likedCourse && dislikedCourse) {
            await CourseModel.updateOne({ _id: courseId }, { $pull: { dislikes: user._id } })
        }

        const responseMessage = likedCourse
            ? 'پسندیدن دوره لغو شد'
            : 'پسندیدن دوره با موفقیت انجام شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const LikeBlogResolver = {
    type: PublicResponseType,
    args: {
        blogId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { blogId } = args
        await checkExistBlog(blogId)

        const likedBlog = await BlogModel.findOne({ _id: blogId, likes: user._id })
        const dislikedBlog = await BlogModel.findOne({ _id: blogId, dislikes: user._id })

        const updateQuery = likedBlog
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await BlogModel.updateOne({ _id: blogId }, updateQuery)

        if (!likedBlog && dislikedBlog) {
            await BlogModel.updateOne({ _id: blogId }, { $pull: { dislikes: user._id } })
        }

        const responseMessage = likedBlog
            ? 'پسندیدن مقاله لغو شد'
            : 'پسندیدن مقاله با موفقیت انجام شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

module.exports = { LikeProductResolver, LikeCourseResolver, LikeBlogResolver }
