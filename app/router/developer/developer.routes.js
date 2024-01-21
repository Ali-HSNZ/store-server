const router = require('express').Router()
const bcrypt = require('bcrypt')
const { randomNumber } = require('../../utils/random-number/random-number.utils')

router.post('/hash/:value', (req, res, next) => {
    try {
        const { value } = req.params
        const salt = bcrypt.genSaltSync(10)
        return res.status(200).json({
            statusCode: 200,
            data: bcrypt.hashSync(value, salt),
        })
    } catch (error) {
        next(error)
    }
})

router.post('/generate-number/:count', (req, res, next) => {
    try {
        const count = req.params.count
        const result = randomNumber(count)
        return res.status(200).json({
            statusCode: 200,
            data: result,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = {
    DeveloperRoutes: router,
}
