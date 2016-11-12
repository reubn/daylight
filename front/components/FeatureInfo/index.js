import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import {featureInfo, hidden, header, title, latlng, edit, close as closeStyle, main, field, group, inlineEdit, idFooter} from './style'

const FeatureInfo = ({feature, activityTypes, locationCategories, close}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  const location = () => {
    const cat = locationCategories[feature.cat]
    return (
      <section className={featureInfo}>
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
          <span className={edit}>Edit</span>
        </header>
        <span className={main}>
          <span className={field}>
            <label>Category</label>
            <value>{cat.name}</value>
          </span>
          {feature.visits.sort(({startTime: a}, {startTime: b}) => a.diff(b)).map(visit => (
            <span className={group} key={visit.id}>
              <label>Visit</label>
              <span className={field}>
                <label>{'Start -> End'}</label>
                <value>{visit.startEndDescriptor}</value>
              </span>
              <span className={field}>
                <label>Duration</label>
                <value>{visit.duration}</value>
              </span>
              <span className={inlineEdit}>EDIT</span>
            </span>
          ))}
        </span>
        <footer className={idFooter}><CopyToClipboard text={feature.id}><span>{feature.id}</span></CopyToClipboard></footer>
      </section>
    )
  }

  const move = () => (
    <section className={featureInfo}>
      <header className={header} style={{background: `linear-gradient(300deg,${activityTypes[feature.activity].join()})`}}>
        <span className={closeStyle} onClick={close}>{'->'}</span>
        <span className={title}>
          <span>
            {feature.activityName}
          </span>
        </span>
        <span className={edit}>Edit</span>
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
        <span className={field}>
          <label>{'Start -> End'}</label>
          <value>{feature.startEndDescriptor}</value>
        </span>
        <span className={field}>
          <label>{'Distance'}</label>
          <value>{`${feature.distance.toFixed(5)}km`}</value>
        </span>
      </span>
      <footer className={idFooter}><CopyToClipboard text={feature.id}><span>{feature.id}</span></CopyToClipboard></footer>
    </section>
    )

  return feature.activity ? move() : location()
}

export default FeatureInfo
