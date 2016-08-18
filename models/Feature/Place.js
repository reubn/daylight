const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Feature = require('../Feature')
const placeCategories = require('./placeCategories')

const placeFeatureSchema = new Schema({
  name: String,
  placeId: {type: String, required: true},
  cat: {type: String, enum: Object.keys(placeCategories), required: true},
  geo: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    time: {type: Date, get: moment}
  }
})

module.exports = Feature.discriminator('Place', placeFeatureSchema)
