import React from 'react'
import {Polyline} from 'react-leaflet'

import Gradient from './Gradient'

const GradientPolyline = props =>
  <span style={{display: 'none'}}>
    <Polyline color={`url("#${props.gradient.id}")`} {...props} />
    <Gradient {...props.gradient} coords={[props.positions[0], props.positions[props.positions.length-1]]} />
  </span>

export default GradientPolyline
