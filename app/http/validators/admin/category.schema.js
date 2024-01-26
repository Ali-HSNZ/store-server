const joi = require('@hapi/joi')
const { MONGO_ID_PATTERN } = require('../../../utils/constants/constants')
const createHttpError = require('http-errors')
const addCategorySchema = joi.object({
    title: joi
        .string()
        .required()
        .min(3)
        .max(50)
        .error(createHttpError.BadRequest('عنوان دسته بندی اشتباه است')),
    parent: joi
        .string()
        .pattern(MONGO_ID_PATTERN)
        .allow('')
        .error(createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد')),
})

module.exports = {
    addCategorySchema,
}
