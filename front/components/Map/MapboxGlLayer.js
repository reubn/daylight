import {PropTypes} from 'react'

import {BaseTileLayer} from 'react-leaflet'

import mapboxGlLeaflet from './mapbox-gl-leaflet'

export default class MapboxGlLayer extends BaseTileLayer{
  componentWillMount(){
    super.componentWillMount()
    this.leafletElement = mapboxGlLeaflet(this.props)
  }
}
