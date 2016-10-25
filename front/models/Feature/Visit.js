import Feature from '../Feature'

class Visit extends Feature {
  constructor(feature={}){
    super(feature)
    const {location} = feature
    this.type = 'Visit'
    this.location = location
  }
}

export default Visit
