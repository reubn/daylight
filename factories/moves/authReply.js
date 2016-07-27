const axios = require('axios')
const moment = require('moment')

const config = require('./config')

module.exports = (factory, req, res, next) => {
  if(req.query.error) return next(new Error(req.query.error === 'access_denied' ? 'FactoryAuthDenied' : 'FactoryError'))
  if(req.query.state !== req.user.id.toString()) return next(new Error('NoAuth'))

  axios.post(config.tokenURL, {
    code: req.query.code,
    grant_type: 'authorization_code',
    client_id: config.clientID,
    client_secret: config.clientSecret
  })
  .then(({data: {access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken, user_id: userID}}) => ({accessToken, expiresIn, refreshToken, userID}))
  .then(authData =>
    axios.get(config.profileURL, {
      params: {
        access_token: authData.accessToken
      }
    })
    .then(({data: {profile: {firstDate: startDate}}}) => moment(startDate, 'YYYYMMDD'))
    .then(startDate => factory.diplomat.saveUserData(req.user, Object.assign({}, authData, {startDate})))
  )
  .then(() => res.send('<script>console.log(opener)</script>'))
  .catch((error) => next(new Error(error === 'invalid_grant' ? 'FactoryAuthError' : 'FactoryError')))
}
