const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../Feature')

const visitFeatureSchema = new Schema({
  location: {type: Schema.Types.ObjectId, ref: 'Location', required: true}
})

module.exports = Feature.discriminator('Visit', visitFeatureSchema)
