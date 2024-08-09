const { Kind } = require('graphql')
const { default: mongoose } = require('mongoose')
const { CourseModel } = require('../../models/course')
const createHttpError = require('http-errors')
const { ProductModel } = require('../../models/products')
const { BlogModel } = require('../../models/blogs')

const parseObject = (valueNode) => {
    const value = Object.create(null)
    valueNode.fields.forEach((field) => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}

const parseValueNode = (valueNode) => {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.valueNode
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.valueNode)
        case Kind.OBJECT: {
            return parseObject(valueNode.value)
        }
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null
    }
}

const parseLiteral = (valueNode) => {
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{' ? JSON.parse(valueNode.value) : valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
        default:
            return null
    }
}

const toObject = (value) => {
    if (typeof value === 'object') {
        return value
    }
    if (typeof value === 'string' && value.charAt(0) === '{') {
        return JSON.parse(value)
    }
    return null
}

const checkValidObjectId = (id, errorMessage) => {
    if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest(errorMessage || 'شناسه نامعتبر است')
}

const checkExistBlog = async (id) => {
    checkValidObjectId(id, 'شناسه بلاگ نامعتبر است')

    const blog = await BlogModel.findById(id)
    if (!blog) throw createHttpError.NotFound('بلاگی با این شناسه یافت نشد')
}

const checkExistProduct = async (id) => {
    checkValidObjectId(id, 'شناسه محصول نامعتبر است')

    const product = await ProductModel.findById(id)
    if (!product) throw createHttpError.NotFound('محصولی با این شناسه یافت نشد')
}

const checkExistCourse = async (id) => {
    checkValidObjectId(id, 'شناسه دوره نامعتبر است')

    const course = await CourseModel.findById(id)
    if (!course) throw createHttpError.NotFound('دوره‌ایی با این شناسه یافت نشد')
}

module.exports = {
    parseLiteral,
    toObject,
    checkExistBlog,
    checkExistProduct,
    checkExistCourse,
    checkValidObjectId,
}
