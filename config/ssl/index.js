const {email, approveDomains} = require('./secure')

module.exports = {
  letsEncrypt: {
    server: 'production',
    agreeTos: true,
    email,
    approveDomains
  }
}
