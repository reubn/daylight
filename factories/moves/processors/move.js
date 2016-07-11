const moment = require('moment')

const Move = require('../models/Move')

const {interpretMoveType} = require('../config')

module.exports = (day, user, factory, {activities, lastUpdate}) =>
  activities.map(({activity, startTime, endTime, trackPoints}) => new Move({
    user,
    activity: interpretMoveType(activity),
    startTime: moment(startTime),
    endTime: moment(endTime),
    day: moment(day, 'YYYYMMDD'),
    geo: {
      type: 'LineString',
      coordinates: trackPoints.map(({lat, lon}) => [lon, lat])
    },
    lastUpdate: moment(lastUpdate),
    factory: factory.slug
  }))
