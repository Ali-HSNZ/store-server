const joi = require('@hapi/joi')

const getOtpSchema = joi.object({
    mobile: joi
        .string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .error(new Error('شماره موبایل وارد شده صحیح نمی‌باشد')),
})

const checkOtpSchema = joi.object({
    mobile: joi
        .string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .error(new Error('شماره موبایل وارد شده صحیح نمی‌باشد')),
    code: joi.string().min(4).max(6).error(new Error('کد ارسال شده صحیح نمی‌باشد')),
})

module.exports = { getOtpSchema, checkOtpSchema }
