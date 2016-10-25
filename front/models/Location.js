class Location {
  constructor({cat='u', geo, name, visits=[], id}={}){
    this.type = 'Location'
    this.id = id
    this.cat = cat
    this.geo = geo
    this.name = name
    this.visits = visits
  }
}

export default Location
