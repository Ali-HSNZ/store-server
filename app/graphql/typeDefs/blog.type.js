const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { PublicUserType, PublicCategoryType } = require('./public.type')
const { CommentType } = require('./comment.type')

const BlogType = new GraphQLObjectType({
    name: 'blogType',
    fields: {
        _id: { type: GraphQLString },
        author: { type: PublicUserType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(PublicCategoryType) },
        comments: { type: new GraphQLList(CommentType) },
    },
})

module.exports = { BlogType }
