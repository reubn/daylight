import moment from 'moment'

import rangeToDates from './rangeToDates'
import datesToRanges from './datesToRanges'

import toURL from './toURL'
import fromURL from './fromURL'

function Range({start, end=start}){
  this.start = moment(start)
  this.end = moment(end)

  this.toDates = () => rangeToDates(this)
  this.toURL = () => toURL(this)
  this.isSameAs = range2 => {
    if(!range2) return false
    if(!(range2.start && range2.end)) return false
    return (this.start.isSame(range2.start) && this.end.isSame(range2.end))
  }

  return this
}
Range.datesToRanges = dates => datesToRanges(Range, dates)
Range.fromURL = url => fromURL(Range, url)

export default Range
