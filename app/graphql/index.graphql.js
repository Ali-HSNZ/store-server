const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Queries
const { BlogResolver } = require('./queries/blog.resolver')
const { ProductResolver } = require('./queries/product.resolver')
const { CategoriesResolver, CategoryChildResolver } = require('./queries/category.resolver')
const { CourseResolver } = require('./queries/course.resolver')
const {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver,
    UserBasketResolver,
} = require('./queries/user-profile.resolver')

// Mutations
const {
    CreateCommentForBlogResolver,
    CreateCommentForCourseResolver,
    CreateCommentForProductResolver,
} = require('./mutations/comment.resolver')

const {
    LikeProductResolver,
    LikeCourseResolver,
    LikeBlogResolver,
} = require('./mutations/like.resolver')

const {
    DisLikeProductResolver,
    DisLikeCourseResolver,
    DisLikeBlogResolver,
} = require('./mutations/dislike.resolver')

const {
    BookmarkProductResolver,
    BookmarkBlogResolver,
    BookmarkCourseResolver,
} = require('./mutations/bookmark.resolver')
const {
    AddProductToBasketResolver,
    RemoveProductFromBasketResolver,
    RemoveCourseFromBasketResolver,
    AddCourseToBasketResolver,
} = require('./mutations/basket.resolver')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
        userBookmarkedBlogs: UserBookmarkedBlogsResolver,
        userBookmarkedCourses: UserBookmarkedCoursesResolver,
        userBookmarkedProducts: UserBookmarkedProductsResolver,
        userBasket: UserBasketResolver,
    },
})
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // create comment
        CreateCommentForBlogResolver, // blog
        CreateCommentForCourseResolver, // course
        CreateCommentForProductResolver, // product

        // like
        LikeBlogResolver, // blog
        LikeCourseResolver, // course
        LikeProductResolver, // product

        // dislike
        DisLikeBlogResolver, // blog
        DisLikeCourseResolver, // course
        DisLikeProductResolver, // product

        // bookmark
        BookmarkBlogResolver, // blog
        BookmarkCourseResolver, // course
        BookmarkProductResolver, // product

        // basket
        AddProductToBasketResolver, // add product
        RemoveProductFromBasketResolver, // remove product

        AddCourseToBasketResolver, // add course
        RemoveCourseFromBasketResolver, // remove course
    },
})

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})

module.exports = {
    graphQLSchema,
}
