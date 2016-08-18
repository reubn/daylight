const index = require('../front')
const activityTypes = require('../models/Feature/activityTypes')
const placeCategories = require('../models/Feature/placeCategories')

module.exports = (req, res, next) => {
  if(req.method === 'GET' && req.accepts('html')) res.send(index(req.user ? req.user.clean() : {}, activityTypes, placeCategories))
  else next()
}
