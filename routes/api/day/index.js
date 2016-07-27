const {Router} = require('express')
const router = new Router()

const getRoute = require('./get')

router.get('/:start/:end*?', getRoute)

module.exports = router
