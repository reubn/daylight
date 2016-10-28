import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import {featureInfo, hidden, header, title, latlng, close as closeStyle, main, field, group} from './style'

const FeatureInfo = ({feature, activityTypes, locationCategories, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => {
    const cat = locationCategories[feature.cat]
    return (
      <span>
        <header className={header}>
          <span className={closeStyle} onClick={close}>{'->'}</span>
          <span className={title}>
            <span>
              {feature.name || '????'}
            </span>
          </span>
          <CopyToClipboard text={feature.formattedLatLng}>
            <span className={latlng}>
              {feature.formattedLatLng}
            </span>
          </CopyToClipboard>
        </header>
        <span className={main}>
          <span className={field}>
            <label>Category</label>
            <value>{cat.name}</value>
          </span>
          {feature.visits.map(visit => (
            <span className={group} key={visit.id}>
              <label>Visit</label>
              <span className={field}>
                <label>{'Start -> End'}</label>
                <value>{`${visit.startTime.format('H:mm:ss')} -> ${visit.endTime.format('H:mm:ss')}`}</value>
              </span>
              <span className={field}>
                <label>Duration</label>
                <value>{visit.duration}</value>
              </span>
            </span>
          ))}
        </span>
      </span>
    )
  }

  const move = () => (
    <span>
      <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
        <span className={closeStyle} onClick={close}>{'->'}</span>
        <span className={title}>
          <span>
            {feature.activityName}
          </span>
        </span>
      </header>
      <span className={main}>
        <span className={field}>
          <label>Activity</label>
          <value>{feature.activityName}</value>
        </span>
        <span className={field}>
          <label>Duration</label>
          <value>{feature.duration}</value>
        </span>
      </span>
    </span>
    )

  return (
    <section className={featureInfo}>
      {feature.activity ? move() : location()}
    </section>
  )
}

export default FeatureInfo
