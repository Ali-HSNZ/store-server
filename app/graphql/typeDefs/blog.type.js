const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { AuthorType, CategoryType } = require('./public.type')

const BlogType = new GraphQLObjectType({
    name: 'blogType',
    fields: {
        _id: { type: GraphQLString },
        author: { type: AuthorType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(CategoryType) },
    },
})

module.exports = { BlogType }
