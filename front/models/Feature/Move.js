import {latLng} from 'leaflet'
import Feature from '../Feature'

class Move extends Feature {
  constructor(feature={}){
    super(feature)
    const {activity, geo} = feature
    this.type = 'Move'
    this.activity = activity
    this.geo = geo.map(p => latLng(p))
  }
  get activityName(){
    return (([f, ...r]) => f.toUpperCase()+r.join``)(this.activity)
  }
  get distance(){
    return this.geo.slice(1).reduce(({total, prev}, current) => ({total: total + prev.distanceTo(current), prev: current}), {total: 0, prev: this.geo[0]}).total / 1000
  }
}

export default Move
