const moment = require('moment')

const Move = require('../models/Move')

const {interpretMoveType} = require('../config')

module.exports = (factory, day, {activities, lastUpdate}) =>
  ({features: activities.map(({activity, startTime, endTime, trackPoints}) => new Move({
    day,
    activity: interpretMoveType(activity),
    startTime: moment(startTime),
    endTime: moment(endTime),
    geo: {
      type: 'LineString',
      coordinates: trackPoints.map(({lat, lon}) => [lon, lat])
    },
    lastUpdate: moment(lastUpdate),
    factory: factory.slug
  }))})
