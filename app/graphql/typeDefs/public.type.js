const { GraphQLString, GraphQLObjectType, GraphQLScalarType } = require('graphql')

const { parseLiteral, toObject } = require('../utils/functions.utils')

const PublicAnyType = new GraphQLScalarType({
    name: 'anyType',
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
})

const PublicUserType = new GraphQLObjectType({
    name: 'public_userType',
    fields: {
        _id: { type: GraphQLString },
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

const PublicResponseType = new GraphQLObjectType({
    name: 'PublicResponseType',
    fields: {
        statusCode: { type: GraphQLString },
        data: { type: PublicAnyType },
    },
})

module.exports = {
    PublicUserType,
    PublicCategoryType,
    PublicAnyType,
    PublicResponseType,
}
