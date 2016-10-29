const {Router} = require('express')
const router = new Router()

const user = require('./user')
const day = require('./day')
const activityTypes = require('./activityTypes')

router.all('/user', user)
router.use('/day', day)
router.get('/activityTypes', activityTypes)

module.exports = router
