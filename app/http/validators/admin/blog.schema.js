const joi = require('@hapi/joi')

const constants = require('../../../utils/constants/constants')
const createHttpError = require('http-errors')

const addBlogSchema = joi.object({
    title: joi
        .string()
        .trim()
        .min(3)
        .max(50)
        .error(createHttpError.BadRequest('عنوان بلاگ صحیح نمی‌باشد')),
    text: joi.string().trim().error(createHttpError.BadRequest('متن ارسال شده صحیح نمی‌باشد')),
    short_text: joi
        .string()
        .trim()
        .error(createHttpError.BadRequest('متن ارسال شده صحیح نمی‌باشد')),
    filename: joi
        .string()
        .pattern(/(\.jpg|\.png|\.webp|\.jpeg|\.gif)$/)
        .error(createHttpError.BadRequest('فرمت تصویر ارسال شده صحیح نمی‌باشد')),
    tags: joi
        .array()
        .min(0)
        .max(20)
        .error(createHttpError.BadRequest('برچسب ها نمی تواند بیشتر از 20 مورد باشد')),
    category: joi
        .string()
        .required()
        .pattern(constants.MONGO_ID_PATTERN)
        .error(createHttpError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    fileUploadPath: joi.allow(),
})
const updateBlogSchema = joi.object({
    category: joi
        .string()
        .min(3)
        .max(30)
        .error(createHttpError.BadRequest('عنوان دسته‌بندی صحیح نمی‌باشد')),
})
module.exports = {
    addBlogSchema,
    updateBlogSchema,
}
