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
const logout = require('./logout')


router.use('/-', protect, api)
router.use('/~', protect, factories.router)

router.use('/register', register)
router.use('/login', login)
router.post('/logout', logout)

// Serve Static Assets
router.use(serveStatic('front/compiled/', {
  maxAge: process.env.NODE_ENV === 'production' ? '30 days' : '0'
}))

// History API Fallback
router.use(historyFallback)

// Error Handling
router.use(errorHandler)

module.exports = router
