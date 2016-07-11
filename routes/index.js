const {Router} = require('express')
const router = new Router()

const serveStatic = require('serve-static')
const fallback = require('express-history-api-fallback')

const api = require('./api')
const factories = require('../factories')

const register = require('./register')
const login = require('./login')

const errorHandler = require('../middleware/errorHandler')
const protect = require('../middleware/protect')

router.use('/@', protect, api, errorHandler)
router.use('/~', protect, factories.router, errorHandler)

router.post('/register', register, errorHandler)
router.post('/login', login, errorHandler)
router.get('/logout', function(req, res){
  req.logout()
  res.json({success: true})
})

// Serve Static Assets
router.use(serveStatic('front/compiled/', {
  index: ['../index.html'],
  maxAge: process.env.NODE_ENV === 'production' ? '30 days' : '0'
}))

router.use(fallback('index.html', {
  root: './front',
  maxAge: process.env.NODE_ENV === 'production' ? '30 days' : '0'
}))

module.exports = router
