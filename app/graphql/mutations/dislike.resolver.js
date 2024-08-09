const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')
const { BlogModel } = require('../../models/blogs')

const { StatusCodes } = require('http-status-codes')
const { checkExistProduct, checkExistCourse, checkExistBlog } = require('../utils/functions.utils')

const DisLikeProductResolver = {
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

        const updateQuery = dislikedProduct
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await ProductModel.updateOne({ _id: productId }, updateQuery)

        if (!dislikedProduct && likedProduct) {
            await ProductModel.updateOne({ _id: productId }, { $pull: { likes: user._id } })
        }

        const responseMessage = dislikedProduct
            ? 'نپسندیدن محصول لغو شد'
            : 'نپسندیدن محصول با موفقیت انجام شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const DisLikeCourseResolver = {
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

        const updateQuery = dislikedCourse
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await CourseModel.updateOne({ _id: courseId }, updateQuery)

        if (!dislikedCourse && likedCourse) {
            await CourseModel.updateOne({ _id: courseId }, { $pull: { likes: user._id } })
        }

        const responseMessage = dislikedCourse
            ? 'نپسندیدن دوره لغو شد'
            : 'نپسندیدن دوره با موفقیت انجام شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const DisLikeBlogResolver = {
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

        const updateQuery = dislikedBlog
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await BlogModel.updateOne({ _id: blogId }, updateQuery)

        const responseMessage = dislikedBlog
            ? 'نپسندیدن مقاله لغو شد'
            : 'نپسندیدن مقاله با موفقیت انجام شد'

        if (!dislikedBlog && likedBlog) {
            await BlogModel.updateOne({ _id: blogId }, { $pull: { likes: user._id } })
        }

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

module.exports = { DisLikeProductResolver, DisLikeCourseResolver, DisLikeBlogResolver }
