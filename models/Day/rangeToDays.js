/* eslint no-param-reassign: 0 */

const moment = require('moment')

function rangeToDays({start, end}, user){
  start.startOf('day'); end.startOf('day')
  if(start.isAfter(end)) [end, start] = [start, end]

  const diff = end.diff(start, 'd')
  let result = []
  for(let i = 0; i <= diff; i++) result = [...result, this.fromDate(moment(start).add(i, 'd'), user)]
  return result
}

module.exports = rangeToDays
