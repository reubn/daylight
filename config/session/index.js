const {secret, name} = require('./secure')

module.exports = Store => ({
  store: new Store({
    host: '127.0.0.1',
    port: 6379
  }),
  secret,
  name,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true
  }
})
