const { Router } = require('express')
const HomeController = require('../../http/controllers/api/home.controller')
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken.middleware')
const router = Router()

router.get('/', verifyAccessToken, HomeController.indexPage)

module.exports = {
    HomeRoutes: router,
}
