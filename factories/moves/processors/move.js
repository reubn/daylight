const moment = require('moment')

const Move = require('../../../models/Feature/Move')

const {interpretMoveType} = require('../config')

module.exports = (factory, day, user, {activities, lastUpdate}) =>
  ({features: activities.map(({activity, startTime, endTime, trackPoints}) => new Move({
    day,
    activity: interpretMoveType(activity),
    startTime: moment(startTime),
    endTime: moment(endTime),
    geo: trackPoints.map(({lat, lon: lng, time}) => ({lat, lng, time: moment(time)})),
    lastUpdate: moment(lastUpdate),
    factory: factory.slug
  }))})
