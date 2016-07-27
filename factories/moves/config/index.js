const interpretMoveType = require('./interpretMoveType')

const {clientID, clientSecret} = require('./secure')

const config = {
  clientID,
  clientSecret,
  redirectURL: state => `https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=${config.clientID}&scope=activity location&state=${encodeURIComponent(state)}`,
  tokenURL: 'https://api.moves-app.com/oauth/v1/access_token',
  refreshTokenURL: refreshToken => `https://api.moves-app.com/oauth/v1/access_token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${config.clientID}&client_secret=${config.clientSecret}`,
  lineURL: 'https://api.moves-app.com/api/1.1/user/storyline/daily',
  profileURL: 'https://api.moves-app.com/api/1.1/user/profile',
  interpretMoveType
}

module.exports = config
