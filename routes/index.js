const {Router} = require('express')
const router = new Router()

const serveStatic = require('serve-static')

const api = require('./api')
const factories = require('../factories')

const errorHandler = require('../middleware/errorHandler')
const protect = require('../middleware/protect')

const historyFallback = require('./historyFallback')
const register = require('./register')
const login = require('./login')

router.use('/@', protect, api, errorHandler)
router.use('/~', protect, factories.router, errorHandler)

router.post('/register', register, errorHandler)
router.post('/login', login, errorHandler)
router.post('/logout', function(req, res){
  req.logout()
  res.json({success: true})
})

// Serve Static Assets
router.use(serveStatic('front/compiled/', {
  maxAge: process.env.NODE_ENV === 'production' ? '30 days' : '0'
}))

// History API Fallback
router.use(historyFallback)

module.exports = router
