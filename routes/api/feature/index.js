const {Router} = require('express')
const router = new Router()

const errorHandler = require('./errorHandler')

const edit = require('./edit')

router.patch('/:id/', edit, errorHandler)

module.exports = router
