const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { PublicAnyType } = require('./public.type')

const CategoryType = new GraphQLObjectType({
    name: 'categoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        children: { type: new GraphQLList(PublicAnyType) },
    },
})

module.exports = { CategoryType }
