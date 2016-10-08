import React from 'react'
import {divIcon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

import {marker, popup, icon as iconStyle} from './style'

const LocationIcon = ({locationCategories, displayFeature}) => {
  const cat = locationCategories[displayFeature.cat]
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
    <Marker
      position={displayFeature.geo}
      icon={divIcon(icon)}
      onMouseover={function(){this.openPopup(); this._bringToFront()}}
      onMouseout={function(){this.closePopup(); this._resetZIndex()}}
    >
      {displayFeature.name ? <Popup closeButton={false} className={popup}><span>{displayFeature.name}</span></Popup> : null}
    </Marker>)
}


export default LocationIcon
