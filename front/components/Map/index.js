import React from 'react'
import {latLngBounds as LatLngBounds} from 'leaflet'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap} from 'react-leaflet'

import KeyCombo from '../KeyCombo'
import MapNav from '../MapNav'
import FeatureInfoContainer from '../FeatureInfoContainer'

import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../Loader'
import MoveLineContainer from './MoveLineContainer'
import LocationIconContainer from './LocationIconContainer'

import {style, accessToken} from './config'
import init from './init'
import {map, mapContainer, mapHolder, featureInfoIsOpen, loader} from './style'

class Map extends React.Component {
  constructor(props){
    super(props)
    init(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.from !== this.props.params.from || nextProps.params.to !== this.props.params.to) init(nextProps)
  }
  render(){
    const selectedFeatureSelected = !!this.props.selected.selectedFeature
    const selectedFeature = this.props.selected.selectedFeature

    const {layers, layerBounds} =
      this.props.selected.displayFeatures
      .reduce(({layers: exisingLayers, layerBounds: exisingBounds}, displayFeature) => {
        const selectedFeatureMode = selectedFeatureSelected && selectedFeature.id === displayFeature.id
        const layer =
          displayFeature.type === 'Move' ?
            <MoveLineContainer displayFeature={displayFeature} selected={selectedFeatureMode} key={displayFeature.id} /> :
            <LocationIconContainer displayFeature={displayFeature} selected={selectedFeatureMode} key={displayFeature.id} />

        return {layers: [...exisingLayers, layer], layerBounds: exisingBounds.extend(displayFeature.geo)}
      }, {layers: [], layerBounds: new LatLngBounds([])})

    const bounds = selectedFeatureSelected ? new LatLngBounds([selectedFeature.geo]) : layerBounds

    return (
      <section className={mapContainer}>
        <span className={`${mapHolder} ${selectedFeatureSelected ? featureInfoIsOpen : ''}`}>
          {this.props.loading ? <Loader className={loader} /> : null}
          <LeafletMap
            bounds={bounds.isValid() ? bounds : undefined}
            boundsOptions={{maxZoom: 16}}
            center={this.props.homeLocation}
            zoom={16}
            className={map}
            zoomControl={false}
            attributionControl={false}
          >
            <MapboxGlLayer accessToken={accessToken} style={style} />
            {layers}
          </LeafletMap>
          <MapNav />
        </span>
        <FeatureInfoContainer />
        <KeyCombo combo="pagedown" handler={this.props.goYesterday} />
        <KeyCombo combo="pageup" handler={this.props.goTomorrow} />
      </section>
    )
  }
}

export default Map
