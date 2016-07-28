import {} from 'leaflet/dist/leaflet.css'
import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

export default class MapView extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section style={{height: '100%', width: '100%'}}>
        <Map center={this.props.homeLocation} zoom={13} style={{height: '100%', width: '100%'}}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/reubnn/cipu12kk1003rcxmb2uylg0no/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg"
            attribution="OpenStreetMap"
          />
          {/*<MapboxGlLayer
            accessToken="pk.eyJ1IjoicmV1Ym5uIiwiYSI6IkdwNWk5eXcifQ.ACZOaLvBQTPi24WU8LYUXg"
            style="mapbox://styles/reubnn/cipu12kk1003rcxmb2uylg0no"
          />*/}
          <Marker position={this.props.homeLocation}>
            <Popup>
              <span>A pretty CSS3 popup.<br />Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </section>
    )
  }
}
