const moment = require('moment')
const {Router} = require('express')
const router = new Router()

const authReply = require('./authReply')
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
    startDate: {type: Date, get: v => moment(v)}
  },
  init: diplomat => {
    factory.diplomat = diplomat
    factory.productionLine = (...args) => productionLine(factory, ...args)
    factory.refreshAccessToken = (...args) => refreshAccessToken(factory, ...args)
    diplomat.use(router, errorHandler)
  }
}

// Routing
router.all('/info', (req, res) => res.json({auth: {url: config.redirectURL(req.user.id)}}))
router.all('/reply', (req, res, next) => authReply(factory, req, res, next))

// Init & Export
module.exports = factory
