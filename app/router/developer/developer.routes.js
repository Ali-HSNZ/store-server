const router = require('express').Router()
const bcrypt = require('bcrypt')
const { randomNumber } = require('../../utils/random-number/random-number.utils')

router.post('/hash/:value', (req, res, next) => {
    try {
        console.log(req.params)

        const { value } = req.params
        const salt = bcrypt.genSaltSync(10)
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: bcrypt.hashSync(value, salt),
        })
    } catch (error) {
        next(error)
    }
})

router.post('/generate-number/:count', (req, res, next) => {
    try {
        const count = req.params.count
        console.log('count: ', count)
        const result = randomNumber(count)
        console.log('result: ', result)
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = {
    DeveloperRoutes: router,
}
