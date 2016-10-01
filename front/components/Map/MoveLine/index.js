import React from 'react'

import GradientPolyline from './GradientPolyline'

const MoveLine = ({activityTypes, feature}) =>
  <GradientPolyline
    id={feature.id}
    gradient={activityTypes[feature.activity].map((colour, index, array) => ({offset: (100 * index) / (array.length - 1), colour}))}
    opacity={0.9}
    positions={feature.geo}
    onMouseover={function(){this.bringToFront()}}
    onMouseout={function(){this.bringToBack()}}
  />

export default MoveLine
