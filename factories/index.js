const {Router} = require('express')
const router = new Router()

const runFactories = require('./runFactories')

const moves = require('./moves')

const factories = [moves].map(factory => {
  factory.init({
    use: (...middleware) => router.use(factory.path, ...middleware),
    getUserData: user => user.factories[factory.slug],
    saveUserData: (user, data) => {
      user.factories[factory.slug] = data
      return user.save()
    }
  })
  return factory
})

module.exports = {
  router,
  runFactories: (...args) => runFactories(factories, ...args),
  factories: factories.reduce((object, factory) => Object.assign({}, object, {[factory.slug]: factory}), {}),
  generateDatabaseSchema: () => factories.reduce((object, factory) => Object.assign({}, object, {[factory.slug]: factory.databaseSchema}), {})
}
