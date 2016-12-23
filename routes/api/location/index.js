const {Router} = require('express')
const router = new Router()

const errorHandler = require('./errorHandler')

const get = require('./get')
const search = require('./search')
const edit = require('./edit')

router.get('/:id?', get, errorHandler)
router.patch('/:id', edit, errorHandler)
router.get('/search/:name?', search, errorHandler)

module.exports = router
