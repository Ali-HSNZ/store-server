const redisClient = require('./init-redis')
const otpGenerator = require('./otp-generator')
const signAccessToken = require('./sign-access-token')
const signRefreshToken = require('./sign-refresh-token')
const verifyRefreshToken = require('./verify-refresh-token')
const { uploadFile, uploadVideo } = require('./multer')
const listOfImagesFromRequest = require('./list-of-images-from-request')
const { deleteFileFromPublic, deleteFileWithPathHandler } = require('./delete-file-from-public')
const copyObject = require('./copy-object')
const setProductFeatures = require('./set-product-features')
const deleteInvalidPropertyInObject = require('./delete-invalid-property-in-object')
const getVideoTime = require('./get-video-time')
const getTimeOfCourse = require('./get-time-of-course')
const getUserBasket = require('./get-user-basket')

module.exports = {
    getUserBasket,
    uploadVideo,
    getTimeOfCourse,
    getVideoTime,
    copyObject,
    deleteInvalidPropertyInObject,
    setProductFeatures,
    listOfImagesFromRequest,
    otpGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    redisClient,
    uploadFile,
    deleteFileFromPublic,
}
