import {latLng} from 'leaflet'
import moment from 'moment'
import Feature from '../Feature'

class Move extends Feature {
  constructor(feature={}){
    super(feature)
    const {activity, geo} = feature
    this.type = 'Move'
    this.activity = activity
    this.geo = geo.map(p => {
      const l = latLng(p)
      if(p.time) l.time = moment(p.time)
      return l
    })
  }
  get activityName(){
    return (([f, ...r]) => f.toUpperCase()+r.join``)(this.activity)
  }
  get distance(){
    return this.geo.slice(1).reduce(({total, prev}, current) => ({total: total + prev.distanceTo(current), prev: current}), {total: 0, prev: this.geo[0]}).total
  }
  get displayDistance(){
    const distance = this.distance
    if(distance >= 1000) return `${(distance / 1000).toFixed(2)}km`
    return `${Math.round(distance)}m`
  }
}

export default Move
