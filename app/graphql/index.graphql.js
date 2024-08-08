const { GraphQLObjectType, GraphQLSchema } = require('graphql')

const { BlogResolver } = require('./queries/blog.resolver')
const { ProductResolver } = require('./queries/product.resolver')
const { CategoriesResolver, CategoryChildResolver } = require('./queries/category.resolver')
const { CourseResolver } = require('./queries/course.resolver')
const { createCommentForBlogResolver } = require('./queries/comment.resolver')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
    },
})
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: { createCommentForBlogResolver },
})

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})

module.exports = {
    graphQLSchema,
}
