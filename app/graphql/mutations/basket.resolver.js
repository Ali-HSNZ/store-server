const { default: mongoose } = require('mongoose')

const { GraphQLString, GraphQLInt } = require('graphql')
const { PublicResponseType } = require('../typeDefs/public.type')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')

const { ProductModel } = require('../../models/products')
const { CourseModel } = require('../../models/course')

const createHttpError = require('http-errors')
const { checkExistProduct, checkExistCourse } = require('../utils/functions.utils')
const { UserModel } = require('../../models/users')
const { copyObject } = require('../../utils')
const { StatusCodes } = require('http-status-codes')

const AddProductToBasketResolver = {
    type: PublicResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { productId } = args
        await checkExistProduct(productId)

        const product = await findProductInBasket(user._id, productId)

        if (product) {
            await UserModel.updateOne(
                { _id: user._id, 'basket.products.productId': productId },
                {
                    $inc: {
                        'basket.products.$.count': 1,
                    },
                }
            )
        } else {
            await UserModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        'basket.products': {
                            productId,
                            count: 1,
                        },
                    },
                }
            )
        }

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: 'محصول به سبد خرید افزوده شد',
            },
        }
    },
}

const AddCourseToBasketResolver = {
    type: PublicResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { courseId } = args
        await checkExistCourse(courseId)

        const userCourse = await UserModel.findOne({ _id: user._id, courses: courseId })

        if (userCourse)
            throw createHttpError.BadRequest('این دوره در لیست دوره های خریداری شده وجود دارد')

        const course = await findCourseInBasket(user._id, courseId)

        if (course) {
            throw createHttpError.BadRequest('این دوره قبلا به سبد خرید اضافه شده')
        } else {
            await UserModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        'basket.courses': {
                            courseId,
                            count: 1,
                        },
                    },
                }
            )
        }

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: 'دوره به سبد خرید افزوده شد',
            },
        }
    },
}

const RemoveProductFromBasketResolver = {
    type: PublicResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { productId } = args
        await checkExistProduct(productId)

        const product = await findProductInBasket(user._id, productId)

        if (!product) throw createHttpError.NotFound('محصول موردنظر در سبد خرید یافت نشد')

        if (product.count > 1) {
            await UserModel.updateOne(
                { _id: user._id, 'basket.products.productId': productId },
                {
                    $inc: {
                        'basket.products.$.count': -1,
                    },
                }
            )
        } else {
            await UserModel.updateOne(
                { _id: user._id, 'basket.products.productId': productId },
                {
                    $pull: {
                        'basket.products': {
                            productId,
                        },
                    },
                }
            )
        }

        const responseMessage =
            product.count > 1 ? 'تعداد محصول کاهش یافت' : 'محصول از سبد خرید حذف شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const RemoveCourseFromBasketResolver = {
    type: PublicResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const { courseId } = args
        await checkExistCourse(courseId)

        const course = await findCourseInBasket(user._id, courseId)

        if (!course) throw createHttpError.NotFound('دوره موردنظر در سبد خرید یافت نشد')

        if (course.count > 1) {
            await UserModel.updateOne(
                { _id: user._id, 'basket.courses.courseId': courseId },
                {
                    $inc: {
                        'basket.courses.$.count': -1,
                    },
                }
            )
        } else {
            await UserModel.updateOne(
                { _id: user._id, 'basket.courses.courseId': courseId },
                {
                    $pull: {
                        'basket.courses': {
                            courseId,
                        },
                    },
                }
            )
        }

        const responseMessage =
            course.count > 1 ? 'تعداد دوره کاهش یافت' : 'دوره از سبد خرید حذف شد'

        return {
            statusCode: StatusCodes.OK,
            data: {
                message: responseMessage,
            },
        }
    },
}

const findProductInBasket = async (userId, productId) => {
    const findResult = await UserModel.findOne(
        {
            _id: userId,
            'basket.products.productId': productId,
        },
        { 'basket.products.$': 1 }
    )

    const userDetail = copyObject(findResult)

    return userDetail?.basket?.products?.[0]
}

const findCourseInBasket = async (userId, courseId) => {
    const findResult = await UserModel.findOne(
        {
            _id: userId,
            'basket.courses.courseId': courseId,
        },
        { 'basket.courses.$': 1 }
    )

    const userDetail = copyObject(findResult)

    return userDetail?.basket?.courses?.[0]
}

module.exports = {
    AddProductToBasketResolver,
    AddCourseToBasketResolver,
    RemoveProductFromBasketResolver,
    RemoveCourseFromBasketResolver,
}
