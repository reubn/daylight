const axios = require('axios')

const chunkRange = require('./chunkRange')

const placeProcessor = require('./processors/place')
const moveProcessor = require('./processors/move')

const config = require('./config')

module.exports = (factory, user, range) => {
  const {accessToken} = factory.diplomat.getUserData(user)

  return Promise.all(
    chunkRange(range)
    .map(({from, to=from}) =>
      axios.get(config.lineURL, {
        params: {
          from: from.format('YYYYMMDD'),
          to: to.format('YYYYMMDD'),
          trackPoints: true,
          access_token: accessToken
        },
        validateStatus: () => true
      })
      .then(res => {
        // If accessToken is invalid
        if(res.status === 401){
          return factory.refreshAccessToken(user)
          .then(({accessToken: newAccessToken}) =>
            axios.get(config.lineURL, {
              params: {
                from: from.format('YYYYMMDD'),
                to: to.format('YYYYMMDD'),
                trackPoints: true,
                access_token: newAccessToken
              }
            }))
        }
        return res
      })
      .then(({data: daysFromRequest}) => daysFromRequest)
    )
  )
  .then(requests => requests.reduce((array, request) => [...array, ...request], []))
  .then(daysFromRequest =>
    daysFromRequest.reduce((features, {segments, date: day}) => {
      if(!segments) return features

      const dayFeatures = [...features, ...segments.reduce((processed, segment) => {
        if(segment.type === 'off') return processed
        return [...processed, ...(segment.type === 'move' ? moveProcessor : placeProcessor)(day, user, factory, segment)]
      }, [])]
      return [...features, ...dayFeatures]
    }, [])
  )
  .catch(err => console.log(err))
}
