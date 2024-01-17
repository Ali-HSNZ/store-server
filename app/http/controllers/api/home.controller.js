const createHttpError = require('http-errors')
const { authSchema } = require('../../validators/user/auth.schema')
const Controller = require('../controller')

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).send('home page')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new HomeController()
