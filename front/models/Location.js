import {latLng} from 'leaflet'

class Location {
  constructor({cat='u', geo, name, visits=[], id}={}){
    this.type = 'Location'
    this.id = id
    this.cat = cat
    this.geo = latLng(geo)
    this.name = name
    this.visits = visits
  }
  get formattedLatLng(){
    return `${this.geo.lat.toFixed(5)}, ${this.geo.lng.toFixed(5)}`
  }
}

export default Location
