import React from 'react'
import {PropTypes} from 'react-leaflet'

class Gradient extends React.Component {
  static contextTypes = {
    map: PropTypes.map
  }
  componentDidMount(){
    this.svgRoot = this.context.map.getPanes().overlayPane.firstChild
    this.gradientElement = this.svgRoot.appendChild(createGradient(this.props))
  }
  componentDidUpdate(prevProps: Object){
    const {id} = this.props
    if(id !== prevProps.id){
      this.gradientElement.remove()
      this.gradientElement = this.svgRoot.appendChild(createGradient(this.props))
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

function createGradient({id, stops, coords: [[lat1, lng1], [lat2, lng2]]}){
  const svgGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
  svgGradient.setAttribute('id', id)

  const rads = Math.atan2(Math.sin(lng2-lng1) * Math.cos(lat2), (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2-lng1)))
  svgGradient.setAttribute('x1', `${50 + (Math.sin(rads) * 50)}%`)
  svgGradient.setAttribute('y1', `${50 + (Math.cos(rads) * 50)}%`)
  svgGradient.setAttribute('x2', `${50 + (Math.sin(rads + Math.PI) * 50)}%`)
  svgGradient.setAttribute('y2', `${50 + (Math.cos(rads + Math.PI) * 50)}%`)

  stops.forEach(({offset, color, colour=color}) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    element.setAttribute('offset', `${offset}%`)
    element.setAttribute('stop-color', colour)
    svgGradient.appendChild(element)
  })

  return svgGradient
}
