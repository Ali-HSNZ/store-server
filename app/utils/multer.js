const { mkdirSync } = require('fs')
const createHttpError = require('http-errors')
const multer = require('multer')
const path = require('path')

const createRoutePath = (req) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()

    const directory = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        'blogs',
        year.toString(),
        month.toString(),
        day.toString()
    )

    req.body.fileUploadPath = path.join(
        'uploads',
        'blogs',
        year.toString(),
        month.toString(),
        day.toString()
    )

    mkdirSync(directory, { recursive: true })
    return directory
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createRoutePath(req)
            return cb(null, filePath)
        }
        cb(null, null)
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            // file type
            const ext = path.extname(file.originalname)
            const fileName = (new Date().getTime() + ext).toString()
            req.body.filename = fileName
            return cb(null, fileName)
        }
        cb(null, null)
    },
})

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const MIME_TYPES = ['.jpg', '.jpeg', '.png', '.webp']
    if (MIME_TYPES.includes(ext)) return cb(null, true)
    return cb(createHttpError.BadRequest('فرمت ارسال شده صحیح نمی باشد'))
}

const fileSize = 1 * 1000 * 1000 // 1MB

const uploadFile = multer({ storage, fileFilter, limits: { fileSize } })

module.exports = uploadFile
