const {Router} = require('express')
const router = new Router()

const errorHandler = require('./errorHandler')

const get = require('./get')

router.get('/:id?', get, errorHandler)

module.exports = router
