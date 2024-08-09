const { GraphQLList } = require('graphql')
const { BlogType } = require('../typeDefs/blog.type')
const { BlogModel } = require('../../models/blogs')
const { CourseType } = require('../typeDefs/course.type')
const { CourseModel } = require('../../models/course')
const { ProductType } = require('../typeDefs/product.type')
const { ProductModel } = require('../../models/products')
const { verifyAccessTokenInGraphQL } = require('../../http/middleware/verifyAccessToken')
const { PublicAnyType } = require('../typeDefs/public.type')
const { UserModel } = require('../../models/users')

const UserBookmarkedBlogsResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const blogs = await BlogModel.find({ bookmarks: user._id }).populate([
            { path: 'author' },
            { path: 'category' },
            { path: 'comments.user' },
            { path: 'comments.answers.user' },
            { path: 'likes' },
            { path: 'dislikes' },
            { path: 'bookmarks' },
        ])

        return blogs
    },
}

const UserBookmarkedCoursesResolver = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const courses = await CourseModel.find({ bookmarks: user._id }).populate([
            { path: 'teacher' },
            { path: 'category' },
            { path: 'comments.user' },
            { path: 'comments.answers.user' },
            { path: 'likes' },
            { path: 'dislikes' },
            { path: 'bookmarks' },
        ])

        return courses
    },
}

const UserBookmarkedProductsResolver = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const products = await ProductModel.find({ bookmarks: user._id }).populate([
            { path: 'category' },
            { path: 'supplier' },
            { path: 'comments.user' },
            { path: 'comments.answers.user' },
            { path: 'likes' },
            { path: 'dislikes' },
            { path: 'bookmarks' },
        ])
        return products
    },
}

const UserBasketResolver = {
    type: PublicAnyType,
    resolve: async (_, args, context) => {
        const { req } = context

        const user = await verifyAccessTokenInGraphQL(req)

        const userDetail = await UserModel.aggregate([
            { $match: { _id: user._id } },
            { $project: { basket: 1 } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'basket.products.productId',
                    foreignField: '_id',
                    as: 'productDetail',
                },
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'basket.courses.courseId',
                    foreignField: '_id',
                    as: 'courseDetail',
                },
            },
            {
                $addFields: {
                    productDetail: {
                        $function: {
                            body: function (productDetail, products) {
                                return productDetail.map((product) => {
                                    const basketProductsCount = products.find(
                                        (item) => item.productId.valueOf() === product._id.valueOf()
                                    ).count

                                    const totalPrice = basketProductsCount * product.price

                                    return {
                                        ...product,
                                        basketCount: basketProductsCount,
                                        totalPrice: totalPrice,
                                        finalPrice:
                                            totalPrice - (product.discount / 100) * totalPrice,
                                    }
                                })
                            },
                            args: ['$productDetail', '$basket.products'],
                            lang: 'js',
                        },
                    },
                    courseDetail: {
                        $function: {
                            body: function (courseDetail) {
                                return courseDetail.map((course) => ({
                                    ...course,
                                    finalPrice:
                                        course.price - (course.discount / 100) * course.price,
                                }))
                            },
                            args: ['$courseDetail'],
                            lang: 'js',
                        },
                    },
                },
            },
            {
                $project: {
                    basket: 0,
                },
            },
        ])

        return userDetail
    },
}

module.exports = {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver,
    UserBasketResolver,
}
