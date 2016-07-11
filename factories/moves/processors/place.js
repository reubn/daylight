const moment = require('moment')

const Place = require('../models/Place')

module.exports = (day, user, factory, {place: {location: {lat, lon}, name, id: placeId}, startTime, endTime, lastUpdate}) => ([new Place({
  user,
  name,
  placeId,
  day: moment(day, 'YYYYMMDD'),
  startTime: moment(startTime),
  endTime: moment(endTime),
  geo: {
    type: 'Point',
    coordinates: [lon, lat]
  },
  lastUpdate: moment(lastUpdate),
  factory: factory.slug
})])
