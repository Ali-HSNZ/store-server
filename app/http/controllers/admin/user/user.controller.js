const { StatusCodes } = require('http-status-codes')
const { UserModel } = require('../../../../models/users')
const { Controller } = require('../../controller')
const { deleteInvalidPropertyInObject } = require('../../../../utils')
const createHttpError = require('http-errors')

class UserController extends Controller {
    async getAll(req, res, next) {
        try {
            const { search } = req.query
            const databaseQuery = {}

            if (search) {
                databaseQuery['$text'] = { $search: new RegExp(search, 'ig') }
            }

            const users = await UserModel.find(databaseQuery)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    users,
                },
            })
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            const id = req.user._id

            const data = req.body

            const blackListFields = ['mobile', 'otp', 'bills', 'discount', 'roles', 'courses']

            deleteInvalidPropertyInObject(data, blackListFields)

            const updateUserResult = await UserModel.updateOne(
                { _id: id },
                {
                    $set: data,
                }
            )

            if (updateUserResult.modifiedCount === 0)
                throw createHttpError.InternalServerError('خطای سرور')

            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: 'ویرایش پروفایل با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController(),
}
