const fs = require('fs')
const path = require('path')
const listOfImagesFromRequest = require('./list-of-images-from-request')

// delete file with file address
const deleteFileWithPathHandler = (fileAddress) => {
    const filePath = path.join(__dirname, '..', '..', 'public', fileAddress)
    fs.unlinkSync(filePath)
}

const deleteFileFromPublic = (fileUploadPath, imagePath, isMultiple = false) => {
    // if fileUploadPath and imagePath has available (don't matter isMultiple is true or not)
    if (fileUploadPath && imagePath) {
        // if single image
        if (!isMultiple) {
            const fileAddress = path.join(fileUploadPath, imagePath).replace(/\\/g, '/')
            deleteFileWithPathHandler(fileAddress)
        }
        // if multiple image
        else if (isMultiple && imagePath?.length > 0) {
            const imagesPath = listOfImagesFromRequest(fileUploadPath, imagePath)
            imagesPath.forEach((fileAddress) => deleteFileWithPathHandler(fileAddress))
        }
    }
}

module.exports = deleteFileFromPublic
