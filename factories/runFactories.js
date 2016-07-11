const Feature = require('./../models/Feature')
const commit = require('./commit')

module.exports = (factories, user, range) => {
  return new Promise(resolve =>
    resolve(factories.reduce(({p, c}, factory) => ({p, c, [factory.consumesLocation ? 'c' : 'p']: [...(factory.consumesLocation ? c : p), factory.productionLine(user, range)]}), {p: [], c: []}))
  )
  .then(({p, c}) =>
    Promise.all(p)
    .then(arrayOfFactoryReturns => commit(user, arrayOfFactoryReturns.reduce((flat, array) => [...flat, ...array], [])))
    .then(() => Promise.all(c))
    .then(arrayOfFactoryReturns => commit(user, arrayOfFactoryReturns.reduce((flat, array) => [...flat, ...array], [])))
    .then(() => Feature.find(
      {
        user,
        day: {
          $gte: range.start,
          $lte: range.end
        }
      }
    ))
    .then(features => features.map(feature => feature.clean()))
  )
}
