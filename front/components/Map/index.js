import React from 'react'
import {latLngBounds as LatLngBounds} from 'leaflet'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap, ZoomControl} from 'react-leaflet'

import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../Loader'
import MoveLineContainer from './MoveLineContainer'
import PlaceIconContainer from './PlaceIconContainer'

import {style, accessToken} from './config'
import init from './init'
import {map, mapContainer, loader} from './style'

export class Map extends React.Component {
  constructor(props){
    super(props)
    init(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.from !== this.props.params.from || nextProps.params.to !== this.props.params.to) init(nextProps)
  }
  render(){
    const {layers, bounds} =
      this.props.selected
      .reduce((existingFeatures, {features}) => [...existingFeatures, ...features], [])
      .reduce(({layers: exisingLayers, bounds: exisingBounds}, feature) => {
        const layer = feature.type === 'Move' ? <MoveLineContainer feature={feature} key={feature.id} /> : <PlaceIconContainer feature={feature} key={feature.id} />
        return {layers: [...exisingLayers, layer], bounds: exisingBounds.extend(feature.geo)}
      }, {layers: [], bounds: new LatLngBounds([])})

    return (
      <section className={mapContainer}>
        {this.props.loading ? <Loader className={loader} /> : null}
        <LeafletMap bounds={bounds.isValid() ? bounds : new LatLngBounds([this.props.homeLocation])} zoom={15} className={map} zoomControl={false}>
          <ZoomControl position="bottomleft" />
          <MapboxGlLayer accessToken={accessToken} style={style} />
          {layers}
        </LeafletMap>
      </section>
    )
  }
}

export default Map
