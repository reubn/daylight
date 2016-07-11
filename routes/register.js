const passport = require('passport')
module.exports = passport.authenticate('register', {successRedirect: '/@/user', failWithError: true})
