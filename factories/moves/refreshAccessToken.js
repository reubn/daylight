const axios = require('axios')
const config = require('./config')

module.exports = (factory, user) => {
  const {refreshToken} = factory.diplomat.getUserData(user)

  return axios.post(config.refreshTokenURL(refreshToken))
  .then(({data: {access_token: accessToken, expires_in: expiresIn, refresh_token: newRefreshToken, user_id: userID}}) => ({accessToken, expiresIn, refreshToken: newRefreshToken, userID}))
  .then(data => factory.diplomat.saveUserData(user, data))
  .then(({factories: {moves}}) => moves)
  .catch(({data: {error}}) => new Error(error === 'invalid_grant' ? 'FactoryAuthError' : 'FactoryError'))
}
