const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const { PublicUserType, PublicCategoryType } = require('./public.type')
const { CommentType } = require('./comment.type')

const EpisodeType = new GraphQLObjectType({
    name: 'EpisodeType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        videoUrl: { type: GraphQLString },
    },
})

const ChaptersType = new GraphQLObjectType({
    name: 'ChaptersType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes: { type: new GraphQLList(EpisodeType) },
    },
})

const CourseType = new GraphQLObjectType({
    name: 'CourseType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        format: { type: GraphQLString },
        category: { type: PublicCategoryType },
        status: { type: GraphQLString },
        teacher: { type: PublicUserType },
        chapters: { type: new GraphQLList(ChaptersType) },
        comments: { type: new GraphQLList(CommentType) },
        likes: { type: new GraphQLList(PublicUserType) },
        dislikes: { type: new GraphQLList(PublicUserType) },
        bookmarks: { type: new GraphQLList(PublicUserType) },
    },
})

module.exports = { CourseType }
