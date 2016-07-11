const moment = require('moment')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const featureSchema = new Schema({
  startTime: {type: Date, required: true, get: moment},
  endTime: {type: Date, required: true, get: moment},
  day: {type: Date, required: true, get: moment},
  lastUpdate: {type: Date, required: true, get: moment},
  factory: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'Story', required: true},
  geo: {
    type: {type: String, required: true},
    coordinates: {type: Array, required: true}
  }
}, {
  collection: 'features'
})

featureSchema.methods.clean = function(){const feature = this.toObject(); return Object.assign({}, feature, {__v: undefined, _id: undefined, __t: undefined, type: feature.__t, id: feature._id})}

module.exports = mongoose.model('Feature', featureSchema)
