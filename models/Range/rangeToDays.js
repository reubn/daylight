/* eslint no-param-reassign: 0 */

const moment = require('moment')

const Day = require('../Day')

function rangeToDays({start, end}, user){
  start.startOf('day'); end.startOf('day')
  if(start.isAfter(end)) [end, start] = [start, end]

  const diff = end.diff(start, 'd')
  let result = []
  for(let i = 0; i <= diff; i++) result = [...result, Day.fromDate(moment(start).add(i, 'd'), user)]
  return result
}

module.exports = rangeToDays
