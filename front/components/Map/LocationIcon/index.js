import React from 'react'
import {Marker} from 'react-leaflet'

import mapIcon from '../mapIcon'
import FeaturePopup from '../FeaturePopup'

const LocationIcon = ({locationCategories, iconImageSize, displayFeature, selected, selectFeature}) => (
  <Marker
    position={displayFeature.geo}
    icon={mapIcon({cat: locationCategories[displayFeature.cat], imageSize: iconImageSize, selected})}
    onMouseover={function(){this.openPopup(); this._bringToFront()}}
    onMouseout={function(){this.closePopup(); this._resetZIndex()}}
    onClick={() => selectFeature(displayFeature)}
  >
    <FeaturePopup displayFeature={displayFeature} />
  </Marker>
  )


export default LocationIcon
