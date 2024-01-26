const fs = require('fs')

const deleteFileFromPublic = (path) => {
    fs.unlinkSync(path)
}

module.exports = { deleteFileFromPublic }
