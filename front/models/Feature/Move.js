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
}

export default Move
