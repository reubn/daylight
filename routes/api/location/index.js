const {Router} = require('express')
const router = new Router()

const errorHandler = require('./errorHandler')

const get = require('./get')
const search = require('./search')

router.get('/:id?', get, errorHandler)
router.get('/search/:name?', search, errorHandler)

module.exports = router
