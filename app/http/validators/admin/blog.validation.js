const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../../constants')
const createHttpError = require('http-errors')

const addBlogSchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: joi.string().error(createHttpError.BadRequest('متن وارد شده صحیح نمی باشد')),
    short_text: joi.string().error(createHttpError.BadRequest('متن وارد شده صحیح نمی باشد')),
    fileUploadPath: joi.allow(),
    filename: joi
        .string()
        .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
        .error(createHttpError.BadRequest('تصویر ارسال شده صحیح نمی باشد')),
    tags: joi
        .array()
        .min(0)
        .max(20)
        .error(createHttpError.BadRequest('برچسب ها نمی تواند بیشتر از 20 آیتم باشد')),
    category: joi
        .string()
        .pattern(MongoIdPattern)
        .error(createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')),
})

module.exports = { addBlogSchema }
