import React from 'react'

import GradientPolyline from './GradientPolyline'

const MoveLine = ({activities, feature}) =>
  <GradientPolyline
    id={feature.id}
    gradient={activities[feature.activity].map((colour, index, array) => ({offset: (100 * index) / (array.length - 1), colour}))}
    opacity={0.9}
    positions={feature.geo}
  />

export default MoveLine
