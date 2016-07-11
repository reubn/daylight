const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../../../models/Feature')

const moveFeatureSchema = new Schema({
  activity: {
    name: {type: String, required: true},
    colour: {type: String, required: false}
  },
  geo: {
    coordinates: [[Number]]
  }
})

module.exports = Feature.discriminator('Move', moveFeatureSchema)
