const {Router} = require('express')
const router = new Router()

const get = require('./get')
const update = require('./update')

router.get('/:start/:end*?', get)
router.put('/:start/:end*?', update)

module.exports = router
