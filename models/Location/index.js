const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colors = require('colors/safe')

const Feature = require('../Feature')

const searchFoursquare = require('./searchFoursquare')
const categories = require('./categories')

const locationSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: false},
  cat: {type: String, enum: Object.keys(categories), required: true},
  geo: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  },
  services: {}
}, {
  collection: 'locations'
})

locationSchema.methods.clean = function(){
  const location = this.toObject()
  return Object.assign({}, location, {__v: undefined, _id: undefined, id: location._id, user: undefined, services: undefined})
}
locationSchema.methods.getFeatures = function(search){return Feature.find(Object.assign({}, search, {location: this._id}))} // May be possible to just search 'this'

locationSchema.statics.from = function({user, name, cat='u', geo, services: rawServices}){
  const ID = Date.now().toString().split('').map(d => colors[['bgMagenta', 'bgBlue', 'bgCyan', 'bgGreen', 'bgYellow', 'bgRed', 'bgBlack', 'bgRed', 'bgCyan', 'bgGreen'][+d]](d)).join``
  console.log(ID, name)
  if(!(geo.lat && geo.lng)) return Promise.reject(new Error('Lat and Lng not provided'))

  const services = Object.keys(rawServices).reduce((obj, key) => (rawServices[key] ? Object.assign({}, obj, {[`services.${key}`]: (Array.isArray(rawServices[key]) ? rawServices[key] : [rawServices[key]])}) : obj), {})
  const {inArray: servicesArray, eachObject: servicesObject} = Object.keys(services).reduce(({inArray, eachObject}, key) => {
    const value = services[key]
    if(value !== undefined){
      return {
        inArray: [{[key]: {$in: value}}, ...inArray],
        eachObject: Object.assign({}, eachObject, {[key]: {$each: value}})
      }
    }
    return {inArray, eachObject}
  }, {inArray: [], eachObject: {}})

  const query = {
    user: user._id,
    $or: [...servicesArray, {geo}]
  }

  const setOnInsert = {
    user: user._id,
    name,
    cat,
    geo
  }

  const update = {
    $addToSet: servicesObject,
    $setOnInsert: setOnInsert
  }

  return this.findOneAndUpdate(query, update, {new: true, upsert: true})
  .then(locationMatch => {
    const {_id: matchId, name: matchName, cat: matchCat, geo: matchGeo, services: matchServices} = locationMatch
    console.log(ID, 'Back from DB')
    if((!matchServices.fSq || !matchServices.fSq.length) && matchCat === 'u'){
      // Should try and find on foursquare
      console.log(ID, 'Should try and find on foursquare')

      // Going to search foursquare
      console.log(ID, 'Going to search foursquare')
      return searchFoursquare({name: matchName, geo: matchGeo})
      .then(({name: fSqName, id: fSqId, cat: fSqCat}) => {
        // ID found on foursquare
        console.log(ID, 'fSq ID found on foursquare')
        return this.findOneAndUpdate({_id: matchId}, {name: fSqName, cat: fSqCat, $addToSet: {'services.fSq': fSqId}})
      })
      .catch(err => {
        if(err.message === 'NoMatch'){
          // ID not found on foursquare
          console.log(ID, 'fSq ID not found on foursquare')
          return locationMatch
        }
      })
    }
    return locationMatch
  })
}

module.exports = mongoose.model('Location', locationSchema)
