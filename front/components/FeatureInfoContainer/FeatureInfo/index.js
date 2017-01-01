import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import {featureInfo, hidden, header, title, edit as editStyle, close as closeStyle, idFooter} from './style'

import InfoPane from './InfoPane'

const FeatureInfo = ({feature, activityTypes, locationCategories, close, edit, editing}) => {
  if(!feature) return <section className={`${featureInfo} ${hidden}`} />

  return (
    <section className={featureInfo}>
      <header className={header} style={feature.activity ? {background: `linear-gradient(300deg,${feature.activityType(activityTypes).join()})`} : {}}>
        <span className={closeStyle} onClick={close}>{'->'}</span>
        <span className={title}>
          <span>
            {feature.name}
          </span>
        </span>
        <span className={editStyle} onClick={() => edit(editing ? null : feature)}>{editing ? 'Save' : 'Edit'}</span>
      </header>
      <InfoPane feature={feature} activityTypes={activityTypes} locationCategories={locationCategories} />
      <footer className={idFooter}>
        <CopyToClipboard text={feature.id}>
          <span>{feature.id}</span>
        </CopyToClipboard>
      </footer>
    </section>
  )
}

export default FeatureInfo
