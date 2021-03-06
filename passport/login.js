const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use('login', new LocalStrategy({passReqToCallback: true},
      function(req, username, password, done){
        User.findOne({$or: [{username: req.body.username.toLowerCase()}, {email: req.body.username.toLowerCase()}]})
        .then(user => {if(!user) throw new Error('NoExist'); return user})
        .then(user => user.comparePasswords(req.body.password))
        .then(user => done(null, user))
        .catch(done)
      }))
