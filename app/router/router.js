const { Router } = require('express')
const { HomeRoutes } = require('./api/index.router')
const router = Router()

router.use('/', HomeRoutes)

module.exports = {
    AllRoutes: router,
}
