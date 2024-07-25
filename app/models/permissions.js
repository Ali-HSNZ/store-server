const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        title: { type: String, unique: true },
        description: { type: String, default: '' },
    },
    {
        id: 0,
        toJSON: {
            virtuals: true,
        },
    }
)

module.exports = {
    PermissionsModel: mongoose.model('permission', Schema),
}
