import React from 'react'
import EditMarkerContainer from './EditMarkerContainer'

import mapIcon from '../../mapIcon'
import FeaturePopup from '../../FeaturePopup'

const LocationMarker = ({locationCategories, iconImageSize, displayFeature, selected, selectedFeatureSelected, selectFeature, editing, ...props}) => (
  <EditMarkerContainer
    {...props}
    editing={editing}
    displayFeature={displayFeature}
    position={displayFeature.geo}
    icon={mapIcon({cat: locationCategories[displayFeature.cat], imageSize: iconImageSize, selected, editing})}
    opacity={selectedFeatureSelected && !selected ? 0.5 : 1}
    onMouseover={function(){this.openPopup(); this._bringToFront()}}
    onMouseout={function(){this.closePopup(); this._resetZIndex()}}
    onClick={() => selectFeature(displayFeature)}
  >
    <FeaturePopup displayFeature={displayFeature} />
  </EditMarkerContainer>
  )


export default LocationMarker
