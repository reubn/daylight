import React from 'react'

import Gradient from './Gradient'

const GradientPolyline = ({Component, ...props}) =>
  <span style={{display: 'none'}}>
    <Component color={`url("#${props.id}")`} {...props} />
    <Gradient stops={props.gradient} id={props.id} coords={[props.positions[0], props.positions[props.positions.length-1]]} />
  </span>

export default GradientPolyline
