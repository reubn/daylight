import React from 'react'
import {latLngBounds as LatLngBounds} from 'leaflet'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap, ZoomControl} from 'react-leaflet'

import KeyCombo from '../KeyCombo'

import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../Loader'
import MoveLineContainer from './MoveLineContainer'
import LocationIconContainer from './LocationIconContainer'

import {style, accessToken} from './config'
import init from './init'
import {map, mapContainer, loader} from './style'

class Map extends React.Component {
  constructor(props){
    super(props)
    init(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.from !== this.props.params.from || nextProps.params.to !== this.props.params.to) init(nextProps)
  }
  render(){
    const {layers, bounds} =
      this.props.selected.displayFeatures
      .reduce(({layers: exisingLayers, bounds: exisingBounds}, displayFeature) => {
        const layer = displayFeature.type === 'Move' ? <MoveLineContainer displayFeature={displayFeature} key={displayFeature.id} /> : <LocationIconContainer displayFeature={displayFeature} key={displayFeature.id} />
        return {layers: [...exisingLayers, layer], bounds: exisingBounds.extend(displayFeature.geo)}
      }, {layers: [], bounds: new LatLngBounds([])})

    return (
      <section className={mapContainer}>
        {this.props.loading ? <Loader className={loader} /> : null}
        <LeafletMap bounds={bounds.isValid() ? bounds : undefined} boundsOptions={{maxZoom: 20}} center={this.props.homeLocation} zoom={20} className={map} zoomControl={false}>
          <ZoomControl position="bottomleft" />
          <MapboxGlLayer accessToken={accessToken} style={style} />
          {layers}
        </LeafletMap>
        <KeyCombo combo="9" handler={this.props.goYesterday} />
        <KeyCombo combo="0" handler={this.props.goTomorrow} />
      </section>
    )
  }
}

export default Map
