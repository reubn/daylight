import React from 'react'
import {divIcon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

import {marker, icon} from './style'

const PlaceIcon = ({activities, feature}) =>
  <Marker
    id={feature.id}
    position={feature.geo}
    icon={divIcon({
      className: marker,
      html: `<div class="${icon}"></div>`,
      iconSize: [32, 32],
      popupAnchor: [0, -18]
    })}
    onMouseover={function(){this.openPopup()}}
    onMouseout={function(){this.closePopup()}}
  >
    <Popup closeButton={false}>
      <span>{feature.name}</span>
    </Popup>
  </Marker>

export default PlaceIcon
