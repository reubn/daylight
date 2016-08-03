const {Router} = require('express')
const router = new Router()

const userRoute = require('./user')
const dayRoute = require('./day')
const activityTypesRoute = require('./activityTypes')

router.all('/user', userRoute)
router.use('/day', dayRoute)
router.get('/activityTypes', activityTypesRoute)

module.exports = router
