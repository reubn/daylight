const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use('register', new LocalStrategy({passReqToCallback: true},
      function(req, username, password, done){
        Promise.all([User.count({owner: true}), User.count({username})])
        .then(([ownerCount, withUsernameCount]) => {
          if(withUsernameCount) throw new Error('TakenUsername')
          const {name, startDate, birthday} = req.body
          return new User({name, username, password, startDate, birthday, owner: !ownerCount})
        })
        .then(user => user.save())
        .then(user => done(null, user))
        .catch(done)
      }))
