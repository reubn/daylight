import React from 'react'

import FeaturePopup from '../FeaturePopup'
import GradientPolyline from './GradientPolyline'

const MoveLine = ({displayFeature, activityTypes, selectFeature}) => (
  <GradientPolyline
    id={displayFeature.id}
    gradient={activityTypes[displayFeature.activity].map((colour, index, array) => ({offset: (100 * index) / (array.length - 1), colour}))}
    opacity={0.9}
    weight={5}
    positions={displayFeature.geo}
    onMouseover={function(){this.bringToFront()}}
    onMousemove={function(e){this._openPopup(e)}}
    onMouseout={function(){this.bringToBack(); this.closePopup()}}
    onClick={() => selectFeature(displayFeature)}
  >
    <FeaturePopup displayFeature={displayFeature} />
  </GradientPolyline>)

export default MoveLine
