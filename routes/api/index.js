const {Router} = require('express')
const router = new Router()

const user = require('./user')
const day = require('./day')
const location = require('./location')
const feature = require('./feature')
const activityTypes = require('./activityTypes')

router.all('/user', user)
router.use('/day', day)
router.use('/location', location)
router.use('/feature', feature)
router.get('/activityTypes', activityTypes)

module.exports = router
