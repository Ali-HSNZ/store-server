const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql')
const { PublicUserType } = require('./public.type')

const CommentAnswerType = new GraphQLObjectType({
    name: 'CommentAnswerType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: PublicUserType },
        comment: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
    },
})

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: PublicUserType },
        comment: { type: GraphQLString },
        answers: { type: new GraphQLList(CommentAnswerType) },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
    },
})

module.exports = { CommentType }
