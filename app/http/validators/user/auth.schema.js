const joi = require('@hapi/joi')
const createHttpError = require('http-errors')
const getOtpSchema = joi.object({
    mobile: joi
        .string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .error(createHttpError.BadRequest('شماره موبایل وارد شده معتبر نیست')),
})

const checkOtpSchema = joi.object({
    mobile: joi
        .string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .error(createHttpError.BadRequest('شماره موبایل وارد شده معتبر نیست')),
    code: joi
        .string()
        .min(4)
        .max(6)
        .error(createHttpError.BadRequest('کد ارسال شده صحیح نمی باشد')),
})

module.exports = {
    getOtpSchema,
    checkOtpSchema,
}
