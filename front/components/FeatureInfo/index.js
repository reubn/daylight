import React from 'react'
import moment from 'moment'

import CopyToClipboard from 'react-copy-to-clipboard'
import humanizeDuration from 'humanize-duration'

import {featureInfo, hidden, header, title, latlng, close as closeStyle, main, field} from './style'

const FeatureInfo = ({feature, activityTypes, locationCategories, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => {
    const latlngFormatted = `${feature.geo.lat.toFixed(5)}, ${feature.geo.lng.toFixed(5)}`
    const cat = locationCategories[feature.cat]
    return (
      <span>
        <header className={header}>
          <span className={closeStyle} onClick={close}>{'->'}</span>
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
        <span className={main}>
          <span className={field}>
            <label>Category</label>
            <value>{cat.name}</value>
          </span>
        </span>
      </span>
    )
  }

  const move = () => {
    const activityName = (([f, ...r]) => f.toUpperCase()+r.join``)(feature.activity)
    const duration = humanizeDuration(moment.duration(moment(feature.endTime).diff(feature.startTime)))
    console.log(moment.duration(moment(feature.endTime).diff(feature.startTime)))
    return (
      <span>
        <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
          <span className={closeStyle} onClick={close}>{'->'}</span>
          <span className={title}>
            <span>
              {activityName}
            </span>
          </span>
        </header>
        <span className={main}>
          <span className={field}>
            <label>Activity</label>
            <value>{activityName}</value>
          </span>
          <span className={field}>
            <label>Duration</label>
            <value>{duration}</value>
          </span>
        </span>
      </span>
    )
  }

  return (
    <section className={featureInfo}>
      {feature.activity ? move() : location()}
    </section>
  )
}

export default FeatureInfo