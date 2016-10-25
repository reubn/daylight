import moment from 'moment'

class Feature {
  constructor({id, startTime, endTime, lastUpdate, factory}={}){
    this.id = id
    this.startTime = moment(startTime)
    this.endTime = moment(endTime)
    this.lastUpdate = moment(lastUpdate)
    this.factory = factory
  }
}

export default Feature
