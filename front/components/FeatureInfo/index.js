import React from 'react'

import {featureInfo, hidden, header} from './style'

const FeatureInfo = ({feature, activityTypes, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => (
    <header className={header}>
      <span>
        {feature.name}
      </span>
    </header>
    )

  const move = () => (
    <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
      <span>
        {(([f, ...r]) => f.toUpperCase()+r.join``)(feature.activity)}
      </span>
    </header>
    )

  return (
    <section className={featureInfo}>
      {feature.activity ? move() : location()}
      {JSON.stringify(feature)}
    </section>
  )
}

export default FeatureInfo
