import moment from 'moment'
import humanizeDuration from 'humanize-duration'

class Feature {
  constructor({id, day, startTime, endTime, lastUpdate, factory}={}){
    this.id = id
    this.dayId = day
    this.startTime = moment(startTime)
    this.endTime = moment(endTime)
    this.lastUpdate = moment(lastUpdate)
    this.factory = factory
  }
  get duration(){
    return humanizeDuration(moment.duration(moment(this.endTime).diff(this.startTime)))
  }
  get startEndDescriptor(){
    return `${this.startTime.format('H:mm:ss, Do')} -> ${this.endTime.format('H:mm:ss, Do')}`
  }
}

export default Feature
