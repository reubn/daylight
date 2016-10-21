import React from 'react'
import {divIcon} from 'leaflet'
import {Marker} from 'react-leaflet'

import FeaturePopup from '../FeaturePopup'

import {marker, icon as iconStyle, selected as selectedStyle} from './style'

const LocationIcon = ({locationCategories, iconImageSize, displayFeature, selected, selectFeature}) => {
  const cat = locationCategories[displayFeature.cat]
  const icon = cat.url
  ? {className: `${marker} ${selected ? selectedStyle : ''}`,
    html: `<div class="${iconStyle}" style="-webkit-mask-image: url(https://foursquare.com/img/categories_v2/${cat.url}_${iconImageSize}.png);"></div>`,
    iconSize: [36, 36],
    popupAnchor: [0, -20]
  }
  : {
    className: `${marker} ${selected ? selectedStyle : ''}`,
    iconSize: [20, 20],
    popupAnchor: [0, -12]
  }

  return (
    <Marker
      position={displayFeature.geo}
      icon={divIcon(icon)}
      onMouseover={function(){this.openPopup(); this._bringToFront()}}
      onMouseout={function(){this.closePopup(); this._resetZIndex()}}
      onClick={() => selectFeature(displayFeature)}
    >
      <FeaturePopup displayFeature={displayFeature} />
    </Marker>)
}


export default LocationIcon
