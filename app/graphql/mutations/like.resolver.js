const { default: mongoose } = require('mongoose')

const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')
const { BlogModel } = require('../../models/blogs')

const { StatusCodes } = require('http-status-codes')
const createHttpError = require('http-errors')

const LikeProductResolver = {
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

        let message = ''

        if (!likedProduct) {
            if (dislikedProduct)
                await ProductModel.updateOne({ _id: productId }, { $pull: { dislikes: user._id } })
            message = 'پسندیدن محصول با موفقیت انجام شد'
        } else message = 'پسندیدن محصول لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
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

        if (!mongoose.isValidObjectId(courseId))
            throw createHttpError.BadRequest('شناسه دوره معتبر نیست')

        // find course
        const course = await CourseModel.findById(courseId)

        if (!course) throw createHttpError.NotFound('دوره یافت نشد')

        const likedCourse = await CourseModel.findOne({ _id: courseId, likes: user._id })
        const dislikedCourse = await CourseModel.findOne({ _id: courseId, dislikes: user._id })

        const updateQuery = likedCourse
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await CourseModel.updateOne({ _id: courseId }, updateQuery)

        let message = ''

        if (!likedCourse) {
            if (dislikedCourse)
                await CourseModel.updateOne({ _id: courseId }, { $pull: { dislikes: user._id } })
            message = 'پسندیدن دوره با موفقیت انجام شد'
        } else message = 'پسندیدن دوره لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
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

        if (!mongoose.isValidObjectId(blogId))
            throw createHttpError.BadRequest('شناسه مقاله معتبر نیست')

        // find blog
        const blog = await BlogModel.findById(blogId)

        if (!blog) throw createHttpError.NotFound('مقاله یافت نشد')

        const likedBlog = await BlogModel.findOne({ _id: blogId, likes: user._id })
        const dislikedBlog = await BlogModel.findOne({ _id: blogId, dislikes: user._id })

        const updateQuery = likedBlog
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } }

        await BlogModel.updateOne({ _id: blogId }, updateQuery)

        let message = ''

        if (!likedBlog) {
            if (dislikedBlog)
                await BlogModel.updateOne({ _id: blogId }, { $pull: { dislikes: user._id } })

            message = 'پسندیدن مقاله با موفقیت انجام شد'
        } else message = 'پسندیدن مقاله لغو شد'

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        }
    },
}

module.exports = { LikeProductResolver, LikeCourseResolver, LikeBlogResolver }
