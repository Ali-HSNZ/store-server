const multer = require('multer')
const path = require('path')

const fs = require('fs')
const createHttpError = require('http-errors')

const createRoute = (req) => {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDay().toString()
    const directory = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'uploads',
        'blogs',
        year,
        month,
        day
    )
    req.body.fileUploadPath = path.join('uploads', 'blogs', year, month, day).replace(/\\/gi, '/')

    fs.mkdirSync(directory, { recursive: true })
    return directory
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = createRoute(req)
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fileName = String(new Date().getTime() + ext)
        req.body.filename = fileName
        cb(null, fileName)
    },
})

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const mimetype = ['.jpg', '.png', '.jpeg', '.web', '.gif']
    if (mimetype.includes(ext)) {
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest('فرمت تصویر ارسال شده صحیح نمی‌باشد'))
}
const fileSize = 1 * 1000 * 1000 // 1MB
const uploadFile = multer({ storage, fileFilter, limits: { fileSize } })

module.exports = { uploadFile }
