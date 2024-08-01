const { graphQLSchema } = require('../graphql/index.resolver')

const graphqlConfig = (req, res) => {
    return {
        schema: graphQLSchema,
        graphiql: true,
        context: { req, res },
    }
}

module.exports = { graphqlConfig }
