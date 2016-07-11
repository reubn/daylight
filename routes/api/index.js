const {Router} = require('express')
const router = new Router()
const moment = require('moment')

const userRoute = require('./user')

router.all('/', (req, res) => {
  res.json({hello: true})
})

router.all('/user', userRoute)
router.all('/TEST/:start/:end*?', ({user, params: {start, end=start}}, res) => require('../../factories').runFactories(user, {start: moment(start, 'YYYYMMDD'), end: moment(end, 'YYYYMMDD')})
.then(a => res.json(a))
.catch(a => res.json(a)))

module.exports = router
