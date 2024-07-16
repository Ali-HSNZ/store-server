const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../../constants')
const createHttpError = require('http-errors')

const addCourseSchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(createHttpError.BadRequest('عنوان دوره صحیح نمی باشد')),
    text: joi.string().error(createHttpError.BadRequest('متن وارد شده صحیح نمی باشد')),
    short_text: joi.string().error(createHttpError.BadRequest('متن وارد شده صحیح نمی باشد')),
    tags: joi
        .array()
        .empty()
        .min(0)
        .max(20)
        .error(createHttpError.BadRequest('برچسب ها نمی تواند بیشتر از 20 آیتم باشد')),
    category: joi
        .string()
        .pattern(MongoIdPattern)
        .error(createHttpError.BadRequest('شناسه دسته‌بندی صحیح نمی باشد')),
    price: joi.number().error(createHttpError.BadRequest('قیمت وارد شده صحیح نمی‌باشد')),
    discount: joi.number().error(createHttpError.BadRequest(' تخفیف وارد شده صحیح نمی‌باشد')),
    type: joi
        .string()
        .regex(/(free|cash|special)/i)
        .error(createHttpError.BadRequest('نوع وارد شده معتبر نیست')),
    filename: joi
        .string()
        .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
        .error(createHttpError.BadRequest('تصویر ارسال شده صحیح نمی باشد')),
    fileUploadPath: joi.allow(),
})

module.exports = { addCourseSchema }
