const { Router } = require('express')
const HomeController = require('../../http/controllers/api/home.controller')
const router = Router()

router.get('/', HomeController.indexPage)

module.exports = {
    HomeRoutes: router,
}
