const { Schema, model } = require('mongoose')

const PaymentSchema = new Schema({})

module.exports = {
    PaymentModel: model('payment', PaymentSchema),
}
