const {Router} = require('express')
const router = new Router()
const passport = require('passport')

const errorHandler = require('./errorHandler')

router.post('/', passport.authenticate('register', {successRedirect: '/-/user', failWithError: true}))

// Error Handling
router.use(errorHandler)

module.exports = router
