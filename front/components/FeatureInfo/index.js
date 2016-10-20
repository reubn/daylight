import React from 'react'

import {featureInfo, hidden} from './style'

const FeatureInfo = ({feature, close}) => (
  <span className={`${featureInfo} ${feature ? '' : hidden}`}>
    {JSON.stringify(feature)}
  </span>
  )

export default FeatureInfo
