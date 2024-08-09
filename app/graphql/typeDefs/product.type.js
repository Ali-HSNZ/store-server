const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const { PublicUserType, PublicCategoryType } = require('./public.type')
const { CommentType } = require('./comment.type')

const ProductFeaturesType = new GraphQLObjectType({
    name: 'ProductFeaturesType',
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        model: { type: new GraphQLList(GraphQLString) },
        madeIn: { type: GraphQLString },
    },
})

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imagesUrl: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        format: { type: GraphQLString },
        supplier: { type: PublicUserType },
        category: { type: PublicCategoryType },
        feature: { type: ProductFeaturesType },
        likes: { type: new GraphQLList(PublicUserType) },
        dislikes: { type: new GraphQLList(PublicUserType) },
        comments: { type: new GraphQLList(CommentType) },
    },
})

module.exports = { ProductType }
