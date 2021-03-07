const mongoos = require('mongoose')

const Schema = mongoos.Schema
const ValidateSchema = new Schema(
  {
    uname: { type: String, required: true },
    website: { type: String, required: true },
    used: { type: Boolean, default: false },
  }, { timestamps: true })

module.exports = mongoos.model('valid', ValidateSchema)