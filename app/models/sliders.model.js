const { Schema, model } = require('mongoose')

const SliderSchema = new Schema({
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    type: { type: String, default: 'main' },
})

module.exports = {
    SliderModel: model('slider', SliderSchema),
}
