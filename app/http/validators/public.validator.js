const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../constants')
const createHttpError = require('http-errors')

const objectIdValidator = joi.object({
    id: joi
        .string()
        .pattern(MongoIdPattern)
        .error(createHttpError.BadRequest('شناسه وارد شده صحیح نمی‌باشد')),
})

module.exports = { objectIdValidator }
