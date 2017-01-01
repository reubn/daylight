import React from 'react'

import Move from './Move'
import Location from './Location'

export default ({feature, ...props}) => {
  const Mode = feature.activity ? Move : Location
  return <Mode feature={feature} {...props} />
}
