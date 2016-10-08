const {clientID, clientSecret} = require('./secure')

module.exports = {
  clientID,
  clientSecret,
  searchURL: 'https://api.foursquare.com/v2/venues/search'
}
