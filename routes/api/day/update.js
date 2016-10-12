const moment = require('moment')

const Range = require('../../../models/Range')

const {runFactories} = require('../../../factories')

const gatherLocations = require('../../../helpers/gatherLocations')
const prepareDaysForClient = require('../../../helpers/prepareDaysForClient')

module.exports = ({user, params: {start, end=start}}, res) => {
  console.log('UPDATING', start, end)
  Promise.all(new Range({start: moment(start, 'YYYYMMDD'), end: moment(end, 'YYYYMMDD')}).toDays(user))
  .then(updatingDays => {
    const updatingDayPromise = runFactories(user, updatingDays)
    return updatingDayPromise
      .then(gatherLocations)
      .then(prepareDaysForClient)
  })
  .then(a => res.json(a))
  .catch(a => console.log(a))
}
