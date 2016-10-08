const moment = require('moment')

const Visit = require('../../../../models/Feature/Visit')

const findLocation = require('./findLocation')

module.exports = (factory, day, user, {place: {type, facebookPlaceId, foursquareId, foursquareCategoryIds, location: {lat, lon: lng}, name, id}, startTime, endTime, lastUpdate}) =>
  findLocation({user, name, lat, lng, movesType: type, movesId: id, foursquareId, foursquareCategoryIds, facebookPlaceId})
  .then(location => new Visit({
    day,
    location,
    startTime: moment(startTime),
    endTime: moment(endTime),
    lastUpdate: moment(lastUpdate),
    factory: factory.slug
  }))
  .then(feature => ({features: [feature]}))
  .catch(error => {console.log(error); return {errors: [new Error('VisitError')]}})
