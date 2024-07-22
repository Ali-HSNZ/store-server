const mongoose = require('mongoose')
const { CommentSchema } = require('./public.schema')

const Schema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        title: { type: String, required: true },
        short_text: { type: String, required: true },
        text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String] },
        category: { type: [mongoose.Types.ObjectId], ref: 'category', required: true },
        comments: { type: [CommentSchema], default: [] },
        likes: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
        dislikes: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
        bookmarks: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

Schema.virtual('imageUrl').get(function () {
    return `${process.env.APPLICATION_BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})

module.exports = {
    BlogModel: mongoose.model('blog', Schema),
}
