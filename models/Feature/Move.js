const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Feature = require('../Feature')
const activityTypes = require('./activityTypes')

const moveFeatureSchema = new Schema({
  activity: {type: String, required: true, enum: Object.keys(activityTypes)},
  geo: [{
    _id: false,
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    time: {type: Date, get: moment}
  }]
})

module.exports = Feature.discriminator('Move', moveFeatureSchema)
