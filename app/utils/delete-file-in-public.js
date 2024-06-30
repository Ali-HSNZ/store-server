const { unlinkSync } = require('fs')
const path = require('path')

const deleteFileInPublic = (fileAddress) => {
    const filepath = path.join(__dirname, '..', '..', 'public', fileAddress)
    unlinkSync(filepath)
}

module.exports = deleteFileInPublic
