import moment from 'moment'

import Visit from './Feature/Visit'
import Move from './Feature/Move'

class Day {
  constructor({day: {id, date, complete}, features}={}){
    this.id = id
    this.date = moment(date)
    this.complete = complete
    this.features = features.map(feature => new (feature.type === 'Move' ? Move : Visit)(feature))
  }
  static fromDate(getState, date){
    return getState().map.cache.days.find(({date: existingDate}) => date.isSame(existingDate))
  }
}

export default Day
