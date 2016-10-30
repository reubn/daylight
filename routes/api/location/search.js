const escapeRegExp = require('lodash.escaperegexp')

const Location = require('../../../models/Location')

module.exports = ({user, params: {name}}, res, next) =>
  Location.find({name: new RegExp(`^${escapeRegExp(name.trim())}`, 'i'), user})
  .select({name: 1, cat: 1})
  .then(locations => locations.map(location => location.clean()))
  .then(clean => res.json(clean))
  .catch(next)
