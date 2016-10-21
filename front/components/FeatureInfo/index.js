import React from 'react'

import {featureInfo, hidden, header, title, latlng} from './style'

const FeatureInfo = ({feature, activityTypes, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => (
    <header className={header}>
      <span className={title}>
        <span>
          {feature.name}
        </span>
      </span>
      <span className={latlng}>
        {(({lat, lng}) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`)(feature.geo)}
      </span>
    </header>
    )

  const move = () => (
    <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
      <span className={title}>
        <span>
          {(([f, ...r]) => f.toUpperCase()+r.join``)(feature.activity)}
        </span>
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
