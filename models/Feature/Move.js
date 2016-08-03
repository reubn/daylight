const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../Feature')
const activityTypes = require('./activityTypes')

const moveFeatureSchema = new Schema({
  activity: {type: String, required: true, enum: Object.keys(activityTypes)},
  geo: [[Number]]
})

module.exports = Feature.discriminator('Move', moveFeatureSchema)
