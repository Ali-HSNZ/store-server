const router = require('express').Router()
const { CategoryRoutes } = require('./category/category.routes')

router.use('/category', CategoryRoutes)

module.exports = {
    AdminRoutes: router,
}
