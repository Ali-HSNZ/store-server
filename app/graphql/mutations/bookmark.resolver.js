const { default: mongoose } = require('mongoose')

const { GraphQLString } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')
const { BlogModel } = require('../../models/blogs')

const { StatusCodes } = require('http-status-codes')
const createHttpError = require('http-errors')

const BookmarkProductResolver = {
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

        const bookmarkedProduct = await ProductModel.findOne({
            _id: productId,
            bookmarks: user._id,
        })

        const updateQuery = bookmarkedProduct
            ? { $pull: { bookmarks: user._id } }
            : { $push: { bookmarks: user._id } }

        await ProductModel.updateOne({ _id: productId }, updateQuery)

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: bookmarkedProduct
                    ? 'محصول از لیست مورد علاقه‌ها حذف شد'
                    : 'محصول به لیست مورد علاقه‌ها اضافه شد',
            },
        }
    },
}

const BookmarkCourseResolver = {
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

        const bookmarkedCourse = await CourseModel.findOne({ _id: courseId, bookmarks: user._id })

        const updateQuery = bookmarkedCourse
            ? { $pull: { bookmarks: user._id } }
            : { $push: { bookmarks: user._id } }

        await CourseModel.updateOne({ _id: courseId }, updateQuery)

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: bookmarkedCourse
                    ? 'دوره از لیست مورد علاقه‌ها حذف شد'
                    : 'دوره به لیست مورد علاقه‌ها اضافه شد',
            },
        }
    },
}

const BookmarkBlogResolver = {
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

        const bookmarkedBlog = await BlogModel.findOne({ _id: blogId, bookmarks: user._id })

        const updateQuery = bookmarkedBlog
            ? { $pull: { bookmarks: user._id } }
            : { $push: { bookmarks: user._id } }

        await BlogModel.updateOne({ _id: blogId }, updateQuery)

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: bookmarkedBlog
                    ? 'مقاله از لیست مورد علاقه‌ها حذف شد'
                    : 'مقاله به لیست مورد علاقه‌ها اضافه شد',
            },
        }
    },
}

module.exports = { BookmarkProductResolver, BookmarkCourseResolver, BookmarkBlogResolver }
