const axios = require('axios')
const config = require('./config')

module.exports = (factory, user) => {
  const userData = factory.diplomat.getUserData(user)

  return axios.post(config.refreshTokenURL(userData.refreshToken))
  .then(({data: {access_token: accessToken, expires_in: expiresIn, refresh_token: newRefreshToken}}) => ({accessToken, expiresIn, refreshToken: newRefreshToken}))
  .then(newData => factory.diplomat.saveUserData(user, Object.assign({}, userData, newData)))
  .then(({factories: {moves}}) => moves)
  .catch(({data: {error}}) => new Error(error === 'invalid_grant' ? 'FactoryAuthError' : 'FactoryError'))
}
