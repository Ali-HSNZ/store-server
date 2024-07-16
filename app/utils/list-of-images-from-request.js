const path = require('path')

const listOfImagesFromRequest = (fileUploadPath, files) => {
    if (files?.length > 0) {
        const imagesPath = files.map((file) => path.join(fileUploadPath, file.filename))
        return imagesPath.map((fileAddress) => fileAddress.replace(/\\/g, '/'))
    } else return []
}
module.exports = listOfImagesFromRequest
