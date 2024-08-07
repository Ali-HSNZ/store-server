const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        comment: { type: String, required: true },
        show: { type: Boolean, required: true, default: false },
        openToComment: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: true },
    }
)

const CommentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        comment: { type: String, required: true },
        answers: { type: [AnswerSchema], default: [] },
        openToComment: { type: Boolean, default: true },
        show: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: { createdAt: true },
    }
)

module.exports = { CommentSchema }
