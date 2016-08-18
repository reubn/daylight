import React from 'react'
import {divIcon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

import {marker, icon} from './style'

export default ({feature, cat: {url}}) => (
  <Marker
    position={feature.geo}
    icon={divIcon({
      className: marker,
      html: `<div class="${icon}" style="-webkit-mask-image: url(https://foursquare.com/img/categories_v2/${url}_32.png);"></div>`,
      iconSize: [36, 36],
      popupAnchor: [0, -20]
    })}
    onMouseover={function(){this.openPopup()}}
    onMouseout={function(){this.closePopup()}}
  >
    <Popup closeButton={false}>
      <span>{feature.name}</span>
    </Popup>
  </Marker>)
