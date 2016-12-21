const moment = require('moment')

const Feature = require('../../../models/Feature')

module.exports = ({params: {id}, body: {dayId, payload}}, res, next) => {
  Feature.findOne({_id: id, day: dayId})
  .then(feature => {
    if(!feature) throw new Error('ResourceNotFound')
    Object.keys(payload).forEach(key => feature[key] = payload[key])
    feature.lastUpdate = moment()
    return feature.save()
  })
  .then(updated => res.json(updated.clean()))
  .catch(next)
}
