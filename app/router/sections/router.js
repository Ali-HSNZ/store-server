const router = require('express').Router()

const { AuthRoutes } = require('./auth/router')
const { graphqlHTTP } = require('express-graphql')
const { graphqlConfig } = require('../../config/graphql.config')
const { AdminRoutes } = require('./admin/router')

// AUTH ROUTES
router.use('/auth', AuthRoutes)

router.use('/graphql', graphqlHTTP(graphqlConfig))

// ADMIN ROUTES
router.use('/admin', AdminRoutes)

module.exports = {
    AllRoutes: router,
}
