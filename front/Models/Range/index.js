/* eslint-disable no-param-reassign */

import moment from 'moment'

import rangeToDates from './rangeToDates'
import datesToRanges from './datesToRanges'

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
    return `${this.start.format('YYYYMMDD')}/${!this.isSame(this.end) ? this.end.format('YYYYMMDD') : ''}`
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
    const [start, end=start] = url.split('/')
    return new Range({start: moment(start, 'YYYYMMDD'), end: end ? moment(end, 'YYYYMMDD') : moment(start, 'YYYYMMDD')})
  }
}

export default Range
