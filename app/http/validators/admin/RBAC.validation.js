const joi = require('@hapi/joi')
const { MongoIdPattern } = require('../../../constants')
const createHttpError = require('http-errors')

const addRoleSchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(new Error('عنوان نقش باید حداقل 3 تا 30 کاراکتر باشد')),
    permissions: joi
        .array()
        .items(joi.string().pattern(MongoIdPattern))
        .error(createHttpError.BadRequest('دسترسی های ارسال شده صحیح نمی باشد')),
    description: joi
        .string()
        .min(0)
        .max(100)
        .error(new Error('توضیحات نقش باید حداکثر 100 کاراکتر باشد')),
})

const addPermissionSchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(30)
        .error(new Error('عنوان دسترسی باید حداقل 3 تا 30 کاراکتر باشد')),
    description: joi
        .string()
        .min(0)
        .max(100)
        .error(new Error('عنوان سطح دسترسی باید حداکثر 100 کاراکتر باشد')),
})

module.exports = { addRoleSchema, addPermissionSchema }
