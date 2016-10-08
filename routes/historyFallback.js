const index = require('../front')
const activityTypes = require('../models/Feature/activityTypes')
const locationCategories = require('../models/Location/categories')

module.exports = (req, res, next) => {
  if(req.method === 'GET' && req.accepts('html')) res.send(index(req.user ? req.user.clean() : {}, activityTypes, locationCategories))
  else next()
}
