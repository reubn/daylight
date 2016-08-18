const axios = require('axios')
const config = require('../../config')

module.exports = ({name, lat, lng, movesType, movesId, foursquareId, foursquareCategoryIds=[], facebookPlaceId}) => new Promise((resolve, reject) => {
  // Have 4Sq Id and 4Sq Cat
  if(foursquareId && !!foursquareCategoryIds.length) return resolve({placeId: foursquareId, cat: foursquareCategoryIds[0]})

  // Moves Built-in Types
  if(movesType === 'home') return resolve({placeId: movesId, cat: '4bf58dd8d48988d103941735'})
  if(movesType === 'school') return resolve({placeId: movesId, cat: '4bf58dd8d48988d13b941735'})
  if(movesType === 'work') return resolve({placeId: movesId, cat: '4bf58dd8d48988d124941735'})
  if(movesType === 'user') return resolve({placeId: movesId, cat: '1'})

  // Intentionally Unknown Place (small circle)
  if(!name) return resolve({placeId: movesId, cat: '0'})

  // Needs Matching with 4Sq
  axios.get(config.fSqURL, {
    params: {
      client_id: config.fSqClientID,
      client_secret: config.fSqClientSecret,
      intent: 'match',
      v: 20160818,
      ll: `${lat},${lng}`,
      query: name
    }
  })
  .then(({data: {response: {venues: [match]}}}) => {
    // No Match on fSq
    if(!match){
      // Use facebookPlaceId as fallback                         // USE FB API AND OFFLINE LIST TO TRY TO MATCH CAT
      if(facebookPlaceId) return resolve({placeId: facebookPlaceId, cat: '0'})

      // Use movesId as fallback
      if(movesId) return resolve({placeId: facebookPlaceId, cat: '0'})

      // Unknown Place w/ movesId nor facebookPlaceId
      return resolve({placeId: `(${lat},${lng})`, cat: '2'})
    }

    // Have Match on fSq
    const {id: placeId, categories: [{id: cat='0'}]} = match
    return resolve({placeId, cat})
  })
  .catch(reject)
})
