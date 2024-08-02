const router = require('express').Router()

const { AuthRoutes } = require('./auth/router')
const { graphqlHTTP } = require('express-graphql')
const { graphqlConfig } = require('../../config/graphql.config')
const { AdminRoutes } = require('./admin/router')

// AUTH ROUTES
router.use('/auth', AuthRoutes)

// ADMIN ROUTES
router.use('/admin', AdminRoutes)

// GRAPHQL ROUTES
router.use('/graphql', graphqlHTTP(graphqlConfig))

module.exports = {
    AllRoutes: router,
}
