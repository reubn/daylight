const index = require('../front')
const activityTypes = require('../models/Feature/activityTypes')

module.exports = (req, res, next) => {
  if(req.method === 'GET' && req.accepts('html')) res.send(index(req.user ? req.user.clean() : {}, activityTypes))
  else next()
}
