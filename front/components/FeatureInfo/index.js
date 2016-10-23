import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import {featureInfo, hidden, header, title, latlng, close as closeStyle, field} from './style'

const FeatureInfo = ({feature, activityTypes, locationCategories, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => {
    const latlngFormatted = `${feature.geo.lat.toFixed(5)}, ${feature.geo.lng.toFixed(5)}`
    const cat = locationCategories[feature.cat]
    return (
      <span>
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
        <span className={field}>
          <label>Category</label>
          <value>{cat.name}</value>
        </span>
      </span>
    )
  }

  const move = () => {
    const activityName = (([f, ...r]) => f.toUpperCase()+r.join``)(feature.activity)
    return (
      <span>
        <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
          <span className={closeStyle} onClick={close}>{'>'}</span>
          <span className={title}>
            <span>
              {activityName}
            </span>
          </span>
        </header>
        <span className={field}>
          <label>Activity</label>
          <value>{activityName}</value>
        </span>
      </span>
    )
  }

  return (
    <section className={featureInfo}>
      {feature.activity ? move() : location()}
      {JSON.stringify(feature)}
    </section>
  )
}

export default FeatureInfo
