import React from 'react'
import {PropTypes} from 'react-leaflet'

import createGradientDef from './makeGradientDef'

class Gradient extends React.Component {
  static contextTypes = {
    map: PropTypes.map
  }
  componentDidMount(){
    this.svgRoot = this.context.map.getPanes().overlayPane.firstChild
    this.gradientElement = this.svgRoot.appendChild(createGradientDef(this.props))
  }
  componentDidUpdate(prevProps){
    const {id, stops} = this.props
    if(id !== prevProps.id || stops.some(({colour, offset}, index) => !(colour === prevProps.stops[index].colour && offset === prevProps.stops[index].offset))){
      this.gradientElement.remove()
      this.gradientElement = this.svgRoot.appendChild(createGradientDef(this.props))
      return
    }
  }
  componentWillUnmount(){
    this.gradientElement.remove()
  }
  render(){
    return null
  }
}

export default Gradient
