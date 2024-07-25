const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        title: { type: String, unique: true },
        description: { type: String, default: '' },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

module.exports = {
    PermissionsModel: mongoose.model('permission', Schema),
}