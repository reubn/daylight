import React from 'react'
import {} from 'leaflet/dist/leaflet.css'
import {Map as LeafletMap, ZoomControl} from 'react-leaflet'

import MapboxGlLayer from './MapboxGlLayer'

import Loader from '../Loader'
import MoveLineContainer from './MoveLineContainer'
import PlaceIconContainer from './PlaceIconContainer'

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
    return (
      <section className={mapContainer}>
        {this.props.loading ? <Loader className={loader} /> : null}
        <LeafletMap center={this.props.homeLocation} zoom={15} className={map} zoomControl={false}>
          <ZoomControl position="bottomleft" />
          {/* <TileLayer url="https://api.mapbox.com/styles/v1/reubnn/cipu12kk1003rcxmb2uylg0no/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" /> */}
          <MapboxGlLayer accessToken="pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg" style="mapbox://styles/reubnn/cipu12kk1003rcxmb2uylg0no" />
          {this.props.selected.reduce(
            (polylines, {features}) => [...polylines, ...features.map(feature => (feature.type === 'Move' ? <MoveLineContainer feature={feature} key={feature.id} /> : <PlaceIconContainer feature={feature} key={feature.id} />))], [])}
        </LeafletMap>
      </section>
    )
  }
}

export default Map
