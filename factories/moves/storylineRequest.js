const axios = require('axios')

const config = require('./config')

module.exports = (accessToken, {start, end=start}) =>
    axios.get(config.lineURL, {
      params: {
        from: start.format('YYYYMMDD'),
        to: end.format('YYYYMMDD'),
        trackPoints: true,
        access_token: accessToken
      }
    })
