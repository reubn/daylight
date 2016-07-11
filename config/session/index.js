const {secret, name} = require('./secure')

module.exports = {
  secret,
  name,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true
  }
}
