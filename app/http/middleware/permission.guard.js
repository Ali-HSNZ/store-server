const createHttpError = require('http-errors')
const { PermissionsModel } = require('../../models/permissions')
const { RoleModel } = require('../../models/role')
const { PERMISSIONS } = require('../../constants')

const checkPermissions = (requiredPermissions = []) => {
    return async (req, res, next) => {
        // return next()
        try {
            const allPermissions = requiredPermissions.flat(2)

            const user = req.user

            const role = await RoleModel.findOne({ title: user.role })
            const permissions = await PermissionsModel.find({ _id: { $in: role.permissions } })

            const userPermissions = permissions.map((item) => item.title)

            const hasPermission = allPermissions.every((permission) => {
                return userPermissions.includes(permission)
            })

            if (userPermissions.includes(PERMISSIONS.ALL)) return next()

            if (allPermissions.length === 0 || hasPermission) return next()
            throw createHttpError.Forbidden('شما به این قسمت دسترسی ندارید')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { checkPermissions }
