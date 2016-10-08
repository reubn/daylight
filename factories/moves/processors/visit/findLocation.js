const Location = require('../../../../models/Location')

module.exports = ({user, name, lat, lng, movesType, movesId, foursquareId, foursquareCategoryIds=[], facebookPlaceId}) => {
  // Choose Category
  let cat = 'u'

  // Have 4Sq Id and 4Sq Cat
  if(foursquareId && !!foursquareCategoryIds.length) cat = foursquareCategoryIds[0]

  // Moves Built-in Types
  if(movesType === 'home') cat = '4bf58dd8d48988d103941735'
  if(movesType === 'school') cat = '4bf58dd8d48988d13b941735'
  if(movesType === 'work') cat = '4bf58dd8d48988d124941735'

  // Intentionally Unknown Location (small circle)
  if(!name) cat = 'u'

  // Generate Services
  const services = {
    mvs: movesId,
    fSq: foursquareId,
    fbP: facebookPlaceId
  }

  return Location.from({user, name, geo: {lat, lng}, cat, services})
  .then(finalLocation => finalLocation)
}
