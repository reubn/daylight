const Location = require('../../../models/Location')

module.exports = ({params: {id}, body: {payload}, user}, res, next) => {
  console.log(user)
  Location.findOne({_id: id, user})
  .then(location => {
    if(!location) throw new Error('ResourceNotFound')
    Object.keys(payload).forEach(key => location[key] = payload[key])
    return location.save()
  })
  .then(updated => res.json(updated.clean()))
  .catch(next)
}
