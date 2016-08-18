import React from 'react'
import {Polyline} from 'react-leaflet'

import Gradient from './Gradient'

const GradientPolyline = props =>
  <span style={{display: 'none'}}>
    <Polyline color={`url("#${props.id}")`} {...props} />
    <Gradient stops={props.gradient} id={props.id} coords={[props.positions[0], props.positions[props.positions.length-1]]} />
  </span>

export default GradientPolyline
