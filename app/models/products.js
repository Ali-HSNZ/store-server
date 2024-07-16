const mongoose = require('mongoose')
const { CommentSchema } = require('./public.schema')

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true }, // virtual - physic
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true },
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
            madeIn: '',
        },
    },
})

ProductSchema.index({ title: 'text', short_text: 'text', text: 'text' })

module.exports = {
    ProductModel: mongoose.model('product', ProductSchema),
}
