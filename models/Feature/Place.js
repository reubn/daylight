const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Feature = require('../Feature')

const placeFeatureSchema = new Schema({
  name: String,
  placeId: String,
  geo: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    time: {type: Date, get: moment}
  }
})

module.exports = Feature.discriminator('Place', placeFeatureSchema)
