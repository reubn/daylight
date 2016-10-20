import React from 'react'

import {featureInfo, hidden} from './style'

const FeatureInfo = ({feature, close}) => (
  <section className={`${featureInfo} ${feature ? '' : hidden}`}>
    {JSON.stringify(feature)}
  </section>
  )

export default FeatureInfo
