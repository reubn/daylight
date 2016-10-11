const Location = require('../models/Location')

module.exports = days => {
  const locationIds = days.reduce((dayLocations, {features}) =>
  [...features.reduce((featureLocations, {location}) => [location ? `${(location._id || location)}` : 0, ...featureLocations], []), ...dayLocations], [])

  return Promise.all([...new Set(locationIds.filter(a => a))].map(location => Location.findById(location).then(l => (l ? l.clean() : l))))
  .then(locations => ({locations: locations.filter(a => a), days}))
}
