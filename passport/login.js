const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use('login', new LocalStrategy({passReqToCallback: true},
      function(req, username, password, done){
        // check in mongo if a user with username exists or not
        User.findOne({username: req.body.username})
        .then(user => {if(!user) throw new Error('NoExist'); return user})
        .then(user => user.comparePasswords(req.body.password))
        .then(user => done(null, user))
        .catch(done)
      }))
