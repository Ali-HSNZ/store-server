const router = require('express').Router()
const HomeController = require('../../http/controllers/api/home.controller')

router.get('/', HomeController.indexPage)

module.exports = {
    HomeRoutes: router,
}
