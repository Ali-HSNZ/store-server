const { GraphQLString, GraphQLObjectType, GraphQLScalarType } = require('graphql')

const { parseLiteral, toObject } = require('../utils/functions.utils')

const PublicAnyType = new GraphQLScalarType({
    name: 'anyType',
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
})

const PublicAuthorType = new GraphQLObjectType({
    name: 'public_authorType',
    fields: {
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        mobile: { type: GraphQLString },
    },
})

const PublicCategoryType = new GraphQLObjectType({
    name: 'public_categoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
})

module.exports = {
    PublicAuthorType,
    PublicCategoryType,
    PublicAnyType,
}
