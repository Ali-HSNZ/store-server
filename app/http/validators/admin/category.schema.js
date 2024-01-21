const joi = require('@hapi/joi')
const { MONGO_ID_PATTERN } = require('../../../utils/constants/constants')
const addCategorySchema = joi.object({
    title: joi.string().required().min(3).max(50).error(new Error('عنوان دسته بندی اشتباه است')),
    parent: joi
        .string()
        .pattern(MONGO_ID_PATTERN)
        .allow('')
        .error(new Error('شناسه ارسال شده صحیح نمی باشد')),
})

module.exports = {
    addCategorySchema,
}
