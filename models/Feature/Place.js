const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../Feature')

const placeFeatureSchema = new Schema({
  name: String,
  placeId: String,
  geo: [Number]
})

module.exports = Feature.discriminator('Place', placeFeatureSchema)
