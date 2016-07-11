const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../../../models/Feature')

const placeFeatureSchema = new Schema({
  name: String,
  placeId: String,
  geo: {
    coordinates: [Number]
  }
})

module.exports = Feature.discriminator('Place', placeFeatureSchema)
