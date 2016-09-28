const moment = require('moment')

const Day = require('../../../models/Day')

const {runFactories} = require('../../../factories')

module.exports = ({user, params: {start, end=start}}, res) => {
  Promise.all(Day.rangeToDays({start: moment(start, 'YYYYMMDD'), end: moment(end, 'YYYYMMDD')}, user))
  // Split Complete and Incomplete
  .then(days => days.reduce(({c, i}, day) => (day.complete? {c: [...c, day], i} : {c, i: [...i, day]}), {c: [], i: []}))
  .then(({c: completeDays, i: incompleteDays}) => {
    const completedDayPromise = Promise.all(completeDays.map(day => day.getFeatures().then(features => ({day, features}))))
    const incompleteDayPromise = runFactories(user, incompleteDays) /* ...moved to runFactories */

    return Promise.all([completedDayPromise, incompleteDayPromise])
      .then(([daysFromComplete, daysFromIncomplete]) =>
        [...daysFromComplete, ...daysFromIncomplete].map(({day, features, errors}) => {
          const readyDay = day.clean()
          const readyFeatures = features.map(feature => feature.clean())
          const readyErrors = !!errors && !!errors.length ? errors.map(({message, name}) => ({reason: message||name||'Unhandled'})) : undefined
          return {day: readyDay, features: readyFeatures, errors: readyErrors}
        }))
  })
  .then(a => res.json(a))
  .catch(a => console.log(a))
}
