const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../../constants')
const createHttpError = require('http-errors')

const addProductSchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
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
        .error(createHttpError.BadRequest('شناسه وارد شده صحیح نمی باشد')),
    price: joi.number().error(createHttpError.BadRequest('قیمت وارد شده صحیح نمی‌باشد')),
    discount: joi.number().error(createHttpError.BadRequest(' تخفیف وارد شده صحیح نمی‌باشد')),
    count: joi.number().empty().error(createHttpError.BadRequest('تعداد وارد شده صحیح نمی‌باشد')),
    weight: joi.number().empty().error(createHttpError.BadRequest(' وزن وارد شده صحیح نمی‌باشد')),
    length: joi.number().empty().error(createHttpError.BadRequest(' طول وارد شده صحیح نمی‌باشد')),
    height: joi
        .number()
        .empty()
        .error(createHttpError.BadRequest(' ارتفاع وارد شده صحیح نمی‌باشد')),
    images: joi.allow(),
    width: joi.number().empty().error(createHttpError.BadRequest(' عرض وارد شده صحیح نمی‌باشد')),
    fileUploadPath: joi.allow(),

    filename: joi
        .string()
        .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
        .error(createHttpError.BadRequest('تصویر ارسال شده صحیح نمی باشد')),
    colors: joi
        .array()
        .optional()
        .error(createHttpError.BadRequest('رنگ Hex وارد شده صحیح نمی‌باشد')),
    madeIn: joi
        .string()
        .optional()
        .error(createHttpError.BadRequest('کشور سازنده محصول معتبر نمی‌باشد')),
    model: joi
        .array()
        .empty()
        .min(0)
        .max(20)
        .error(
            createHttpError.BadRequest(
                'مدل وارد شده برای محصول صحیح نمی‌باشد | حداکثر 20 مدل معتبر است'
            )
        ),
})

module.exports = { addProductSchema }
