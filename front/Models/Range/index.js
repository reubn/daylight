/* eslint-disable no-param-reassign */

import moment from 'moment'

import rangeToDates from './rangeToDates'
import datesToRanges from './datesToRanges'

import toURL from './toURL'
import fromURL from './fromURL'

class Range {
  constructor({start, end=start}){
    if(end.isBefore(start)) start = end

    this.start = moment(start)
    this.end = moment(end)
  }
  toDates(){
    return rangeToDates(this)
  }
  toURL(){
    return toURL(this)
  }
  isSameAs(range2){
    if(!range2) return false
    if(!(range2.start && range2.end)) return false
    return (this.start.isSame(range2.start) && this.end.isSame(range2.end))
  }
  static datesToRanges(dates){
    return datesToRanges(Range, dates)
  }
  static fromURL(url){
    return fromURL(Range, url)
  }
}

export default Range
