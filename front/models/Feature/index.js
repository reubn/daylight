import moment from 'moment'
import humanizeDuration from 'humanize-duration'

class Feature {
  constructor({id, startTime, endTime, lastUpdate, factory}={}){
    this.id = id
    this.startTime = moment(startTime)
    this.endTime = moment(endTime)
    this.lastUpdate = moment(lastUpdate)
    this.factory = factory
  }
  get duration(){
    return humanizeDuration(moment.duration(moment(this.endTime).diff(this.startTime)))
  }
}

export default Feature
