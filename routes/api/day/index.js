const {Router} = require('express')
const router = new Router()

const getRoute = require('./get')
const updateRoute = require('./update')

router.get('/:start/:end*?', getRoute)
router.put('/:start/:end*?', updateRoute)

module.exports = router
