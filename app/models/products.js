const mongoose = require('mongoose')
const { CommentSchema } = require('./public.schema')

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        short_text: { type: String, required: true },
        text: { type: String, required: true },
        images: { type: [String], required: true },
        tags: { type: [String], default: [] },
        category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
        comments: { type: [CommentSchema], default: [] },
        likes: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
        dislikes: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
        bookmarks: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        count: { type: Number },
        type: { type: String, required: true }, // virtual - physical
        format: { type: String },
        supplier: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        feature: {
            type: Object,
            required: true,
            default: {
                length: '',
                height: '',
                width: '',
                weight: '',
                colors: [],
                model: [],
                madeIn: '',
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

ProductSchema.index({ title: 'text', short_text: 'text', text: 'text' })

ProductSchema.virtual('imagesUrl').get(function () {
    return this.images.map(
        (image) => `${process.env.APPLICATION_BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
    )
})

module.exports = {
    ProductModel: mongoose.model('product', ProductSchema),
}
