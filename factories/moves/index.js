const axios = require('axios')
const {Router} = require('express')
const router = new Router()

const productionLine = require('./productionLine')
const refreshAccessToken = require('./refreshAccessToken')
const errorHandler = require('./errorHandler')

const config = require('./config')

// Definition
const factory = {
  name: 'moves',
  path: '/moves',
  slug: 'moves',
  providesLocation: true,
  consumesLocation: false,
  databaseSchema: {
    accessToken: String,
    refreshToken: String,
    expiresIn: Number,
    userID: String,
    startDate: Date
  },
  init: diplomat => {
    factory.diplomat = diplomat
    factory.productionLine = (...args) => productionLine(factory, ...args)
    factory.refreshAccessToken = (...args) => refreshAccessToken(factory, ...args)
    diplomat.use(router, errorHandler)
  }
}

// Routing
router.all('/auth', (req, res) => res.json({url: config.redirectURL(req.user.id)}))
router.all('/reply', (req, res, next) => {
  if(req.query.error) return next(new Error(req.query.error === 'access_denied' ? 'FactoryAuthDenied' : 'FactoryError'))
  if(req.query.state !== req.user.id.toString()) return next(new Error('NoAuth'))

  axios.post(config.tokenURL, {
    code: req.query.code,
    grant_type: 'authorization_code',
    client_id: config.clientID,
    client_secret: config.clientSecret
  })
  .then(({data: {access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken, user_id: userID}}) => ({accessToken, expiresIn, refreshToken, userID}))
  .then(data => factory.diplomat.saveUserData(req.user, data))
  .then(() => res.send('<script>console.log(opener)</script>'))
  .catch(({data: {error}}) => next(new Error(error === 'invalid_grant' ? 'FactoryAuthError' : 'FactoryError')))
})

// Init & Export
module.exports = factory
