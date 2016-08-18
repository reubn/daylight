import React from 'react'
import {divIcon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

import {marker, popup, icon as iconStyle} from './style'

const PlaceIcon = ({placeCategories, feature}) => {
  const cat = placeCategories[feature.cat]
  const icon = cat.url
  ? {className: marker,
    html: `<div class="${iconStyle}" style="-webkit-mask-image: url(https://foursquare.com/img/categories_v2/${cat.url}_32.png);"></div>`,
    iconSize: [36, 36],
    popupAnchor: [0, -20]
  }
  : {
    className: marker,
    iconSize: [20, 20],
    popupAnchor: [0, -12]
  }

  return (
    <Marker position={feature.geo} icon={divIcon(icon)} onMouseover={function(){this.openPopup()}} onMouseout={function(){this.closePopup()}}>
      {feature.name ? <Popup closeButton={false} className={popup}><span>{feature.name}</span></Popup> : null}
    </Marker>)
}


export default PlaceIcon
