import React from 'react'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap, ZoomControl} from 'react-leaflet'

import {map, mapContainer} from './style'
import GradientPolyline from './GradientPolyline'
import MapboxGlLayer from './MapboxGlLayer'

const Map = props => (
  <section className={mapContainer}>
    <LeafletMap center={props.homeLocation} zoom={15} className={map} zoomControl={false}>
      <ZoomControl position="bottomleft" />
      {/* <TileLayer url="https://api.mapbox.com/styles/v1/reubnn/cipu12kk1003rcxmb2uylg0no/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" /> */}
      <MapboxGlLayer accessToken="pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" style="mapbox://styles/reubnn/cipu12kk1003rcxmb2uylg0no" />
    </LeafletMap>
  </section>
    )

export default Map
