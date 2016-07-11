const Feature = require('./../models/Feature')

module.exports = (user, arrayOfFeatures) => {
  const featurePromises = arrayOfFeatures.map(feature => {
    const {factory, day, startTime, lastUpdate} = feature
    return Feature.findOne({factory, day, user: user._id, startTime})
          .then(duplicate => {
            if(!duplicate) return feature.save()
            if(duplicate.lastUpdate.isBefore(lastUpdate)) return Promise.all([feature.save(), duplicate.remove()])
            return Promise.resolve()
          })
  })
  return Promise.all(featurePromises)
}
