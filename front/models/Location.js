import {latLng} from 'leaflet'

class Location {
  constructor({cat='u', geo, name, visits=[], id}={}){
    this.type = 'Location'
    this.id = id
    this.cat = cat
    this.geo = latLng(geo)
    this.locationName = name
    this.visits = visits
  }
  get name(){
    return this.locationName || '?????'
  }
  get formattedLatLng(){
    return `${this.geo.lat.toFixed(5)}, ${this.geo.lng.toFixed(5)}`
  }

  locationCategory(locationCategories){
    return locationCategories[this.cat]
  }
}

export default Location
