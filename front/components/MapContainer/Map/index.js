import React from 'react'
import {latLngBounds as LatLngBounds, Editable} from 'leaflet'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap} from 'react-leaflet'

import {} from 'leaflet-editable'
import mapIcon from './mapIcon'

import KeyCombo from '../../KeyCombo'
import MapNav from '../../MapNav'
import FeatureInfoContainer from '../../FeatureInfoContainer'

import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../../Loader'
import MoveLineContainer from './MoveLineContainer'
import LocationIconContainer from './LocationIconContainer'

import {style, accessToken} from './config'
import init from './init'
import {map, mapContainer, mapHolder, featureInfoIsOpen, loader} from './style'

class Map extends React.Component {
  componentWillMount(){
    init(this.props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.from !== this.props.params.from || nextProps.params.to !== this.props.params.to) init(nextProps)
  }
  render(){
    const selectedFeatureSelected = !!this.props.selected.selectedFeature
    const selectedFeature = this.props.selected.selectedFeature

    const editingFeatureSelected = !!this.props.selected.editingFeature
    const editingFeature = this.props.selected.editingFeature

    const {layers, layerBounds} =
      this.props.selected.displayFeatures
      .reduce(({layers: exisingLayers, layerBounds: exisingBounds}, displayFeature) => {
        const selectedFeatureMode = selectedFeatureSelected && selectedFeature.id === displayFeature.id
        const editingFeatureMode = editingFeatureSelected && editingFeature.id === displayFeature.id

        const layer =
          displayFeature.type === 'Move'
          ? <MoveLineContainer displayFeature={displayFeature} editing={editingFeatureMode} selected={selectedFeatureMode} selectedFeatureSelected={selectedFeatureSelected} key={displayFeature.id} />
        : <LocationIconContainer displayFeature={displayFeature} editing={editingFeatureMode} selected={selectedFeatureMode} selectedFeatureSelected={selectedFeatureSelected} key={displayFeature.id} />

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
            editable={true}
            editOptions={{
              vertexMarkerClass: Editable.VertexMarker.extend({
                initialize(...args){
                  Editable.VertexMarker.prototype.initialize.call(this, ...args)
                  this.setIcon(mapIcon({size: 10}))
                }}),
              middleMarkerClass: Editable.MiddleMarker.extend({
                initialize(...args){
                  Editable.MiddleMarker.prototype.initialize.call(this, ...args)
                  this.setIcon(mapIcon({size: 10}))
                }})
            }}
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
