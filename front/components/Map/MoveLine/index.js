import React from 'react'

import GradientPolyline from './GradientPolyline'

const MoveLine = ({activityTypes, displayFeature}) =>
  <GradientPolyline
    id={displayFeature.id}
    gradient={activityTypes[displayFeature.activity].map((colour, index, array) => ({offset: (100 * index) / (array.length - 1), colour}))}
    opacity={0.9}
    positions={displayFeature.geo}
    onMouseover={function(){this.bringToFront()}}
    onMouseout={function(){this.bringToBack()}}
  />

export default MoveLine
