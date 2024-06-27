const { Controller } = require('../controller')

module.exports = new (class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.send('صفحه اصلی')
        } catch (error) {
            next(error)
        }
    }
})()
