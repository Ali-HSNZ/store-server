const { Schema, Types, model } = require('mongoose')

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parent: { type: Types.ObjectId },
})

const BlogSchema = new Schema(
    {
        author: { type: Types.ObjectId, ref: 'user', required: true },
        title: { type: String, required: true },
        text: { type: String, required: true },
        short_text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String], required: true, default: [] },
        category: { type: Types.ObjectId, ref: 'category', required: true },
        comments: { type: [CommentSchema], default: [] },
        like: { type: [Types.ObjectId], ref: 'users', default: [] },
        dislike: { type: [Types.ObjectId], ref: 'users', default: [] },
        bookmark: { type: [Types.ObjectId], ref: 'users', default: [] },
    },
    { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
)
BlogSchema.virtual('author_detail', {
    ref: 'users',
    localField: '_id',
    foreignField: 'author',
})
BlogSchema.virtual('author_detail', {
    ref: 'category',
    localField: '_id',
    foreignField: 'category',
})
module.exports = {
    BlogModel: model('blog', BlogSchema),
}
