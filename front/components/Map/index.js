import React from 'react'
import {divIcon} from 'leaflet'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap, ZoomControl, Marker, Popup} from 'react-leaflet'

import GradientPolyline from './GradientPolyline'
import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../Loader'

import init from './init'
import {map, mapContainer, loader, shadow, marker} from './style'

export class Map extends React.Component {
  constructor(props){
    super(props)
    init(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.from !== this.props.params.from || nextProps.params.to !== this.props.params.to) init(nextProps)
  }
  render(){
    return (
      <section className={mapContainer}>
        {this.props.loading ? <Loader className={loader} /> : null}
        <LeafletMap center={this.props.homeLocation} zoom={15} className={map} zoomControl={false}>
          <ZoomControl position="bottomleft" />
          {/* <TileLayer url="https://api.mapbox.com/styles/v1/reubnn/cipu12kk1003rcxmb2uylg0no/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" /> */}
          <MapboxGlLayer accessToken="pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" style="mapbox://styles/reubnn/cipu12kk1003rcxmb2uylg0no" />
          {this.props.selected.reduce(
            (polylines, {features}) => [...polylines, ...features.map(
              feature =>
                feature.type === 'Move'
                ? <GradientPolyline key={feature.id} id={feature.id} gradient={this.props.activities[feature.activity].map((c, i, a) => ({offset: (100 * i) / (a.length - 1), colour: c}))} opacity={0.9} positions={feature.geo} />
              : <Marker key={feature.id} id={feature.id} position={feature.geo} icon={divIcon({className: shadow, html: `<div class="${marker}"></div>`, iconSize: [32, 32], popupAnchor: [0, -18]})} onMouseover={function(){this.openPopup()}} onMouseout={function(){this.closePopup()}}>
                    <Popup closeButton={false}>
                      <span>{feature.name}</span>
                    </Popup>
                </Marker>
            )], [])}
        </LeafletMap>
      </section>
    )
  }
}

export default Map
