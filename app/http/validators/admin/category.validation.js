const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../../constants')

const addCategorySchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(new Error('عنوان دسته بندی باید حداقل 3 تا 30 کاراکتر باشد')),
    parent: joi
        .string()
        .allow('')
        .pattern(MongoIdPattern)
        .error(new Error('شناسه وارد شده صحیح نمی باشد')),
})

const editCategorySchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(new Error('عنوان دسته بندی باید حداقل 3 تا 30 کاراکتر باشد')),
})

module.exports = { addCategorySchema, editCategorySchema }
