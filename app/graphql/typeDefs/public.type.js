const { GraphQLString, GraphQLObjectType } = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'authorType',
    fields: {
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        mobile: { type: GraphQLString },
    },
})

const CategoryType = new GraphQLObjectType({
    name: 'categoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
})

module.exports = {
    AuthorType,
    CategoryType,
}
