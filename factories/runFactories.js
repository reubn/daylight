const commit = require('./commit')
const mergeFactoryReturns = require('./mergeFactoryReturns')

module.exports = (factories, user, dayPromises) => {
  const split = factories.reduce(({p, c}, factory) => ({p, c, [factory.consumesLocation ? 'c' : 'p']: [...(factory.consumesLocation ? c : p), factory.productionLine(user, dayPromises)]}), {p: [], c: []})

  return Promise.all(split.p)
  .then(mergeFactoryReturns)
  .then(merged => commit(user, merged))
  .then(completedP =>
    Promise.all(split.c)
    .then(mergeFactoryReturns)
    .then(merged => commit(user, merged))
    .then(completedC => [completedP, completedC])
    .then(mergeFactoryReturns)
  )
  // Moved from get.js
  .then(dayPairs => dayPairs.map(({day, features: affectedFeatures, errors: existingErrors=[]}) => {
    if(existingErrors.length !== 0) day.complete = false
    else day.complete = true

    return day.save()
      .then(() => day.getFeatures({_id: {$nin: affectedFeatures.map(feature => feature._id)}}))
      .then(unaffectedFeatures => ({day, features: [...affectedFeatures, ...unaffectedFeatures], errors: existingErrors}))
  }))
  .then(incompletePromises => Promise.all(incompletePromises))
}
