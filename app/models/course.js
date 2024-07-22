const mongoose = require('mongoose')
const { CommentSchema } = require('./public.schema')
const { getTimeOfCourse } = require('../utils')

const EpisodeSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        type: { type: String, default: 'unlock' }, // lock | unlock
        time: { type: String, required: true },
        videoAddress: { type: String, required: true },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

EpisodeSchema.virtual('videoUrl').get(function () {
    return `${process.env.APPLICATION_BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})

const ChaptersSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: '' },
    episodes: { type: [EpisodeSchema], default: [] },
})

const Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        short_text: { type: String, required: true },
        text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String], default: [] },
        category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
        comments: { type: [CommentSchema], default: [] },
        likes: { type: [mongoose.Types.ObjectId], default: [] },
        dislikes: { type: [mongoose.Types.ObjectId], default: [] },
        bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        type: { type: String, default: 'free', required: true }, // free, cash, spatial
        status: { type: String, default: 'notStarted' }, // notStarted, completed, holding
        teacher: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        chapters: { type: [ChaptersSchema], default: [] },
        students: { type: [mongoose.Types.ObjectId], default: [], ref: 'user' },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

Schema.index({ title: 'text', short_text: 'text', text: 'text' })

Schema.virtual('totalTime').get(function () {
    return getTimeOfCourse(this.chapters)
})

Schema.virtual('imageUrl').get(function () {
    return `${process.env.APPLICATION_BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})

module.exports = {
    CourseModel: mongoose.model('course', Schema),
}
