const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        title: { type: String, unique: true },
        permissions: { type: [mongoose.Types.ObjectId], ref: 'permissions', default: [] },
        description: { type: String, default: '' },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

module.exports = {
    RoleModel: mongoose.model('role', Schema),
}
