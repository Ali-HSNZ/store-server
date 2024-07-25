const { Controller } = require('../../controller')
const { PermissionsModel } = require('../../../../models/permissions')
const { StatusCodes } = require('http-status-codes')
const { addPermissionSchema } = require('../../../validators/admin/RBAC.validation')
const createHttpError = require('http-errors')
const { copyObject } = require('../../../../utils')

class PermissionController extends Controller {
    async getAll(req, res, next) {
        try {
            const permissions = await PermissionsModel.find({})
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    permissions,
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async add(req, res, next) {
        try {
            const { title, description } = await addPermissionSchema.validateAsync(req.body)

            await this.findByTitle(title)

            const permission = await PermissionsModel.create({ title, description })

            if (!permission) throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'سطح دسترسی با موفقیت افزوده شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params

            await this.findById(id)

            const data = copyObject(req.body)

            deleteInvalidPropertyInObject(data, [])

            const updatePermissionResult = await PermissionsModel.updateOne(
                { _id: id },
                { $set: data }
            )

            if (updatePermissionResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'به روزرسانی سطح دسترسی با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            await this.findById(id)

            const removePermissionResult = await PermissionsModel.deleteOne({ _id: id })

            if (removePermissionResult.deletedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'سطح دسترسی با موفقیت حذف شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async findByTitle(title) {
        const permission = await PermissionsModel.findOne({ title })
        if (permission) throw createHttpError.BadRequest('دسترسی قبلا ثبت شده است')
    }
    async findById(_id) {
        const permission = await PermissionsModel.findOne({ _id })
        if (!permission) throw createHttpError.NotFound('دسترسی یافت شده است')
        return permission
    }
}

module.exports = {
    PermissionController: new PermissionController(),
}
