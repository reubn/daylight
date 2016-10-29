const Location = require('../../../models/Location')

module.exports = ({user, params: {id}}, res, next) =>
  Location.findById(id)
  .then(location => {
    if(location) return res.json(location.clean())
    next(new Error('ResourceNotFound'))
  })
  .catch(next)
