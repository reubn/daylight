const Feature = require('./../models/Feature')

module.exports = (user, dayFeaturePairs) =>
  Promise.all(dayFeaturePairs.map(({day, features=[], errors=[]}) =>
    Promise.all(features.map(feature => {
      const {factory, startTime, endTime, lastUpdate} = feature

      // NEED TO IMP PROPER MATCHING AND REWRITING
      return Feature.findOne({factory, day, $or: [{startTime}, {endTime}]})
            .then(duplicate => {
              if(!duplicate) return feature.save().catch(() => {throw new Error('FeatureSaveError')})
              if(duplicate.lastUpdate.isBefore(lastUpdate)){
                return duplicate.remove()
                       .catch(() => {throw new Error('DuplicateRemoveError')})
                       .then(feature.save)
                       .catch(error => {throw error.name === 'MongooseError' ? new Error('FeatureSaveError') : error})
              }
              return duplicate
            })
            .then(featureInDB => ({features: [featureInDB]}))
            .catch((error=new Error('UnknownCommitError')) => ({errors: [error]}))
    }))
    .then(featuresOrErrors => {
      const {features: completeFeatures, errors: completeErrors} =
        featuresOrErrors.reduce(
          ({features: existingFeatures=[], errors: existingErrors=[]}, {features: newFeatures=[], errors: newErrors=[]}) => ({
            features: [...existingFeatures, ...newFeatures],
            errors: [...existingErrors, ...newErrors]
          }),
          {features: [], errors})

      return {day, features: completeFeatures, errors: completeErrors}
    })
  ))
