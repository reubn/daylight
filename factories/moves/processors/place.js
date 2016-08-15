const moment = require('moment')

const Place = require('../../../models/Feature/Place')

module.exports = (factory, day, {place: {location: {lat, lon: lng}, name, id: placeId}, startTime, endTime, lastUpdate}) => {
  const feature =
      new Place({
        day,
        name,
        placeId,
        startTime: moment(startTime),
        endTime: moment(endTime),
        geo: {lat, lng},
        lastUpdate: moment(lastUpdate),
        factory: factory.slug
      })

  return {features: [feature]}
}
