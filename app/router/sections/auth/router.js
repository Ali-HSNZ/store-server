const router = require('express').Router()

const { AuthRoutes } = require('./routes/auth.routes')

router.use('/', AuthRoutes)

module.exports = {
    AuthRoutes: router,
}
