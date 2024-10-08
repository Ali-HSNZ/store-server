const { GraphQLString } = require('graphql')

const { BlogModel } = require('../../models/blogs')
const { CourseModel } = require('../../models/course')
const { ProductModel } = require('../../models/products')

const createHttpError = require('http-errors')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')
const { StatusCodes } = require('http-status-codes')
const { PublicResponseType } = require('../typeDefs/public.type')
const {
    checkValidObjectId,
    checkExistBlog,
    checkExistProduct,
    checkExistCourse,
} = require('../utils/functions.utils')

const CreateCommentForBlogResolver = {
    type: PublicResponseType,
    args: {
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { blogId, parent, comment } = args

        await checkExistBlog(blogId)

        if (parent && parent.trim().length > 0) {
            checkValidObjectId(parent, 'شناسه نظر نامعتبر است')

            const commentDocument = await getComment(BlogModel, parent)

            if (commentDocument && !commentDocument?.openToComment)
                throw createHttpError.BadRequest('ثبت پاسخ مجاز نیست')

            const answerResult = await BlogModel.updateOne(
                { 'comments._id': parent },
                {
                    $push: {
                        'comments.$.answers': {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false,
                        },
                    },
                }
            )

            if (answerResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فرایند ثبت پاسخ انجام نشد')
            else {
                return {
                    statusCode: StatusCodes.CREATED,
                    data: {
                        message: 'پاسخ شما با موفقیت ثبت شد، پس از تایید در وبسایت قرار میگیرد',
                    },
                }
            }
        } else {
            const commentResult = await BlogModel.updateOne(
                { _id: blogId },
                {
                    $push: {
                        comments: {
                            comment,
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            )

            if (commentResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فرایند ثبت نظر انجام نشد')
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: 'ثبت نظر با موفقیت انجام شد، پس از تایید در وبسایت قرار میگیرد',
            },
        }
    },
}
const CreateCommentForProductResolver = {
    type: PublicResponseType,
    args: {
        productId: { type: GraphQLString },
        parent: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { productId, parent, comment } = args

        await checkExistProduct(productId)

        if (parent && parent.trim().length > 0) {
            checkValidObjectId(parent, 'شناسه نظر نامعتبر است')

            const commentDocument = await getComment(ProductModel, parent)

            if (commentDocument && !commentDocument?.openToComment)
                throw createHttpError.BadRequest('ثبت پاسخ مجاز نیست')

            const answerResult = await ProductModel.updateOne(
                {
                    _id: productId,
                    'comments._id': parent,
                },
                {
                    $push: {
                        'comments.$.answers': {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false,
                        },
                    },
                }
            )

            if (answerResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فرایند ثبت پاسخ انجام نشد')
            else {
                return {
                    statusCode: StatusCodes.CREATED,
                    data: {
                        message: 'پاسخ شما با موفقیت ثبت شد، پس از تایید در وبسایت قرار میگیرد',
                    },
                }
            }
        } else {
            const commentResult = await ProductModel.updateOne(
                { _id: productId },
                {
                    $push: {
                        comments: {
                            comment,
                            user: user._id,
                            comment,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            )
            if (commentResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فرایند ثبت نظر انجام نشد')
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: 'ثبت نظر با موفقیت انجام شد، پس از تایید در وبسایت قرار میگیرد',
            },
        }
    },
}
const CreateCommentForCourseResolver = {
    type: PublicResponseType,
    args: {
        courseId: { type: GraphQLString },
        parent: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { courseId, parent, comment } = args

        await checkExistCourse(courseId)

        if (parent && parent.trim().length > 0) {
            checkValidObjectId(parent, 'شناسه نظر نامعتبر است')

            const commentDocument = await getComment(CourseModel, parent)

            if (commentDocument && !commentDocument?.openToComment)
                throw createHttpError.BadRequest('ثبت پاسخ مجاز نیست')

            const answerResult = await CourseModel.updateOne(
                {
                    _id: courseId,
                    'comments._id': parent,
                },
                {
                    $push: {
                        'comments.$.answers': {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false,
                        },
                    },
                }
            )

            if (answerResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('ثبت پاسخ انجام نشد')
            else {
                return {
                    statusCode: StatusCodes.CREATED,
                    data: {
                        message: 'پاسخ شما با موفقیت ثبت شد، پس از تایید در وبسایت قرار میگیرد',
                    },
                }
            }
        } else {
            const commentResult = await CourseModel.updateOne(
                { _id: courseId },
                {
                    $push: {
                        comments: {
                            comment,
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            )
            if (commentResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('فرایند ثبت نظر انجام نشد')
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: 'ثبت نظر با موفقیت انجام شد، پس از تایید در وبسایت قرار میگیرد',
            },
        }
    },
}

const getComment = async (model, id) => {
    if (id) {
        const findComment = await model.findOne({ 'comments._id': id }, { 'comments.$': 1 })
        if (!findComment?.comments?.[0])
            throw createHttpError.NotFound('کامنت با این شناسه یافت نشد')
        return findComment.comments?.[0]
    }
    return null
}

module.exports = {
    CreateCommentForBlogResolver,
    CreateCommentForProductResolver,
    CreateCommentForCourseResolver,
}
