const moment = require('moment')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = require('../Feature')

const daySchema = new Schema({
  date: {type: Date, required: true, get: v => moment(v)},
  lastUpdate: {type: Date, get: v => moment(v)},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  complete: {type: Boolean, required: true, default: false}
}, {
  collection: 'days'
})

daySchema.methods.clean = function(){
  this.depopulate('user')
  const day = this.toObject()
  return Object.assign({}, day, {__v: undefined, _id: undefined, id: day._id})
}
daySchema.methods.getFeatures = function(search){return Feature.find(Object.assign({}, search, {day: this}))}

daySchema.methods.toDate = function(){
  return this.date
}
// TODO ATOMIC
daySchema.statics.fromDate = function(date, user){
  return this.findOne({user, date})
  .then(day => {
    if(!day) return new this({user, date}).save()
    return Promise.resolve(day)
  })
}

module.exports = mongoose.model('Day', daySchema)
