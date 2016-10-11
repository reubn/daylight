const moment = require('moment')

const daysToRanges = require('./daysToRanges')
const rangeToDays = require('./rangeToDays')

function Range({start, end}){
  this.start = moment(start)
  this.end = moment(end)

  this.toDays = user => rangeToDays(this, user)

  return this
}

Range.daysToRanges = days => daysToRanges(Range, days)

module.exports = Range
