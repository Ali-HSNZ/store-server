const { StatusCodes } = require('http-status-codes')
const { Controller } = require('../../controller')
const { RoleModel } = require('../../../../models/role')
const createHttpError = require('http-errors')
const { addRoleSchema } = require('../../../validators/admin/RBAC.validation')
const { default: mongoose } = require('mongoose')
const { copyObject, deleteInvalidPropertyInObject } = require('../../../../utils')

class RoleController extends Controller {
    async getAll(req, res, next) {
        try {
            const roles = await RoleModel.find({})
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles,
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async add(req, res, next) {
        try {
            const { title, permissions } = await addRoleSchema.validateAsync(req.body)

            await this.findByTitle(title)

            const role = await RoleModel.create({ permissions, title })

            if (!role) throw createHttpError.InternalServerError('خطای سرور')
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: 'نقش با موفقیت افزوده شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params

            const role = await this.findWithIdOrTitle(id)

            const data = copyObject(req.body)

            // check valid each permissions id
            if (data?.permissions?.length > 0) {
                data?.permissions.forEach((permission) => {
                    if (!mongoose.isValidObjectId(permission))
                        throw createHttpError.BadRequest('شناسه سطح دسترسی معتبر نمی باشد')
                })
            }
            console.log({ data })

            deleteInvalidPropertyInObject(data, [])

            const updateRoleResult = await RoleModel.updateOne({ _id: role._id }, { $set: data })

            if (updateRoleResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'به روزرسانی نقش با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const { field } = req.params

            const role = await this.findWithIdOrTitle(field)

            const removeResult = await RoleModel.deleteOne({ _id: role._id })

            if (removeResult.deletedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'نقش با موفقیت حذف شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async findWithIdOrTitle(field) {
        let findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
        const role = await RoleModel.findOne(findQuery)
        if (!role) throw createHttpError.BadRequest('نقش یافت نشد')
        return role
    }
    async findByTitle(title) {
        const role = await RoleModel.findOne({ title })
        if (role) throw createHttpError.BadRequest('نقش وارد شده تکراری است')
    }
}

module.exports = {
    RoleController: new RoleController(),
}
