import React from 'react'
import {Marker} from 'react-leaflet'

import mapIcon from '../../mapIcon'
import FeaturePopup from '../../FeaturePopup'

const LocationMarker = ({locationCategories, iconImageSize, displayFeature, selected, selectedFeatureSelected, selectFeature}) => (
  <Marker
    position={displayFeature.geo}
    icon={mapIcon({cat: locationCategories[displayFeature.cat], imageSize: iconImageSize, selected})}
    opacity={selectedFeatureSelected && !selected ? 0.5 : 1}
    onMouseover={function(){this.openPopup(); this._bringToFront()}}
    onMouseout={function(){this.closePopup(); this._resetZIndex()}}
    onClick={() => selectFeature(displayFeature)}
  >
    <FeaturePopup displayFeature={displayFeature} />
  </Marker>
  )


export default LocationMarker
