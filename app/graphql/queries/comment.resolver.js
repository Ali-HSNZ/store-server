const { GraphQLString } = require('graphql')

const { BlogModel } = require('../../models/blogs')
const createHttpError = require('http-errors')
const { default: mongoose } = require('mongoose')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')
const { StatusCodes } = require('http-status-codes')
const { PublicResponseType } = require('../typeDefs/public.type')
const { copyObject } = require('../../utils')

const createCommentForBlogResolver = {
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

        checkValidObjectId(blogId, 'شناسه بلاگ نامعتبر است')

        await checkExistBlog(blogId)

        if (parent && parent.trim().length > 0) {
            checkValidObjectId(parent, 'شناسه دسته‌بندی نامعتبر است')

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
            await BlogModel.updateOne(
                { _id: blogId },
                {
                    $push: {
                        comments: {
                            comment,
                            comment,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            )
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: 'ثبت نظر با موفقیت انجام شد، پس از تایید در وبسایت قرار میگیرد',
            },
        }
    },
}

const checkExistBlog = async (id) => {
    const blog = await BlogModel.findById(id)
    if (!blog) throw createHttpError.NotFound('بلاگی با این شناسه یافت نشد')
}

const getComment = async (model, id) => {
    if (id) {
        const findComment = await model.findOne({ 'comments._id': id }, { 'comments.$': 1 })
        const comment = copyObject(findComment)
        if (!comment.comments?.[0]) throw createHttpError.NotFound('کامنت با این شناسه یافت نشد')
        return comment.comments?.[0]
    }
    return null
}

const checkValidObjectId = (id, errorMessage) => {
    if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest(errorMessage || 'شناسه نامعتبر است')
}

module.exports = { createCommentForBlogResolver }
