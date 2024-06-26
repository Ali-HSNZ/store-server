const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    desc: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    dislike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, required: true },
    feature: {
        type: Object,
        required: true,
        default: {
            length: '',
            height: '',
            width: '',
            weight: '',
            color: [],
            model: [],
            madeIn,
        },
    },
})

module.exports = {
    ProductModel: mongoose.model('product', Schema),
}
