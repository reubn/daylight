const moment = require('moment')

const Day = require('../../../models/Day')

const {runFactories} = require('../../../factories')

const gatherLocations = require('../../../helpers/gatherLocations')
const prepareDaysForClient = require('../../../helpers/prepareDaysForClient')

module.exports = ({user, params: {start, end=start}}, res) => {
  Promise.all(Day.rangeToDays({start: moment(start, 'YYYYMMDD'), end: moment(end, 'YYYYMMDD')}, user))
  // Split Complete and Incomplete
  .then(days => days.reduce(({c, i}, day) => (day.complete ? {c: [...c, day], i} : {c, i: [...i, day]}), {c: [], i: []}))
  .then(({c: completeDays, i: incompleteDays}) => {
    const completedDayPromise = Promise.all(completeDays.map(day => day.getFeatures().then(features => ({day, features}))))
    const incompleteDayPromise = runFactories(user, incompleteDays) /* ...moved to runFactories */

    return Promise.all([completedDayPromise, incompleteDayPromise])
      .then(([daysFromComplete, daysFromIncomplete]) => [...daysFromComplete, ...daysFromIncomplete])
      .then(gatherLocations)
      .then(prepareDaysForClient)
  })
  .then(a => res.json(a))
  .catch(a => console.log(a))
}
