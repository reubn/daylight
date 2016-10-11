const mongoose = require('mongoose')
const databaseConfig = require('../../config/database')
const moment = require('moment')

const Range = require('./index')

// Database
mongoose.Promise = global.Promise
mongoose.connect(databaseConfig.url).then(() => console.info('🗄🗄🗄 - Connected - 🗄🗄🗄'))

Promise.all(new Range({start: moment('20150516', 'YYYYMMDD'), end: moment('20150518', 'YYYYMMDD')}).toDays({_id: '576c2c73d5c0606308c46325'}))
.then(days => days.forEach(d => console.log(d.date.format('YYYYMMDD'))))

const r = Range.daysToRanges([{date: moment('20150516', 'YYYYMMDD')}, {date: moment('20150518', 'YYYYMMDD')}])
console.log(r)
