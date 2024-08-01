const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const { AuthorType } = require('./public.type')

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
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imagesUrl: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        format: { type: GraphQLString },
        supplier: { type: AuthorType },
        feature: { type: ProductFeaturesType },
    },
})

module.exports = { ProductType }
