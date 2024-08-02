const { CategoryType } = require('../typeDefs/category.type')
const { CategoryModel } = require('../../models/categories')
const { GraphQLList, GraphQLString } = require('graphql')

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),

    resolve: async () => {
        return await CategoryModel.find({ parent: undefined })
    },
}

const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString },
    },
    resolve: async (obj, args) => {
        const { parent } = args
        return await CategoryModel.find({ parent })
    },
}

module.exports = { CategoriesResolver, CategoryChildResolver }
