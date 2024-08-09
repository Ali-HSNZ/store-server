const { default: mongoose } = require('mongoose')

const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')
const { BlogModel } = require('../../models/blogs')

const { StatusCodes } = require('http-status-codes')
const createHttpError = require('http-errors')

const DisLikeProductResolver = {
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

        const updateQuery = dislikedProduct
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await ProductModel.updateOne({ _id: productId }, updateQuery)

        let message = ''

        if (!dislikedProduct) {
            if (likedProduct)
                await ProductModel.updateOne({ _id: productId }, { $pull: { likes: user._id } })
            message = 'نپسندیدن محصول با موفقیت انجام شد'
        } else message = 'نپسندیدن محصول لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
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

        if (!mongoose.isValidObjectId(courseId))
            throw createHttpError.BadRequest('شناسه دوره معتبر نیست')

        // find course
        const course = await CourseModel.findById(courseId)

        if (!course) throw createHttpError.NotFound('دوره یافت نشد')

        const likedCourse = await CourseModel.findOne({ _id: courseId, likes: user._id })
        const dislikedCourse = await CourseModel.findOne({ _id: courseId, dislikes: user._id })

        const updateQuery = dislikedCourse
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await CourseModel.updateOne({ _id: courseId }, updateQuery)

        let message = ''

        if (!dislikedCourse) {
            if (likedCourse)
                await CourseModel.updateOne({ _id: courseId }, { $pull: { likes: user._id } })
            message = 'نپسندیدن دوره با موفقیت انجام شد'
        } else message = 'نپسندیدن دوره لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
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

        if (!mongoose.isValidObjectId(blogId))
            throw createHttpError.BadRequest('شناسه مقاله معتبر نیست')

        // find blog
        const blog = await BlogModel.findById(blogId)

        if (!blog) throw createHttpError.NotFound('مقاله یافت نشد')

        const likedBlog = await BlogModel.findOne({ _id: blogId, likes: user._id })
        const dislikedBlog = await BlogModel.findOne({ _id: blogId, dislikes: user._id })

        const updateQuery = dislikedBlog
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } }

        await BlogModel.updateOne({ _id: blogId }, updateQuery)

        let message = ''

        if (!dislikedBlog) {
            if (likedBlog)
                await BlogModel.updateOne({ _id: blogId }, { $pull: { likes: user._id } })
            message = 'نپسندیدن مقاله با موفقیت انجام شد'
        } else message = 'نپسندیدن مقاله لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        }
    },
}

module.exports = { DisLikeProductResolver, DisLikeCourseResolver, DisLikeBlogResolver }
