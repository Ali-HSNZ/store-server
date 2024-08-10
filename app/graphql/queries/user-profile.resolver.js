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
const { getUserBasket } = require('../../utils')

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

        const userDetail = await getUserBasket(user._id)

        return userDetail
    },
}

module.exports = {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver,
    UserBasketResolver,
}
