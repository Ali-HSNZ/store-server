const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    userName: { type: String, lowercase: false },
    mobile: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
        type: Object,
        default: {
            code: 0,
            expiresIn: 0,
        },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ['USER'] },
})

module.exports = {
    UserModel: mongoose.model('user', Schema),
}
