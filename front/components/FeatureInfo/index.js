import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import {featureInfo, hidden, header, title, latlng, close as closeStyle} from './style'

const FeatureInfo = ({feature, activityTypes, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => {
    const latlngFormatted = (({lat, lng}) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`)(feature.geo)
    return (
      <header className={header}>
        <span className={closeStyle} onClick={close}>{'>'}</span>
        <span className={title}>
          <span>
            {feature.name || 'Unknown'}
          </span>
        </span>
        <CopyToClipboard text={latlngFormatted}>
          <span className={latlng}>
            {latlngFormatted}
          </span>
        </CopyToClipboard>
      </header>
    )
  }

  const move = () => (
    <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
      <span className={closeStyle} onClick={close}>{'>'}</span>
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
