const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CoupanSchema = new Schema({
  website: { type: String, required: true },
  expireDate: { type: Date, required: true },
  discount: { type: Number, required: true },
  createdBy: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('coupan', CoupanSchema)