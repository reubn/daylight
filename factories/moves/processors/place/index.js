const moment = require('moment')

const Place = require('../../../../models/Feature/Place')

const idAndCat = require('./idAndCat')

module.exports = (factory, day, {place: {type, facebookPlaceId, foursquareId, foursquareCategoryIds, location: {lat, lon: lng}, name, id}, startTime, endTime, lastUpdate}) =>
  idAndCat({name, lat, lng, movesType: type, movesId: id, foursquareId, foursquareCategoryIds, facebookPlaceId})
  .then(({placeId, cat}) => new Place({
    day,
    name,
    placeId,
    cat,
    startTime: moment(startTime),
    endTime: moment(endTime),
    geo: {lat, lng},
    lastUpdate: moment(lastUpdate),
    factory: factory.slug
  }))
  .then(feature => ({features: [feature]}))
  .catch(error => {console.log(error); return {errors: [new Error('PlaceError')]}})
