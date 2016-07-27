const {Router} = require('express')
const router = new Router()

const userRoute = require('./user')
const dayRoute = require('./day')

router.all('/user', userRoute)
router.use('/day', dayRoute)

module.exports = router
