import React from 'react'

import {Popup} from 'react-leaflet'

import {popup} from './style'

const FeaturePopup = ({displayFeature}) => {
  if(displayFeature.type === 'Visit' && !displayFeature.name) return null

  const content = displayFeature.type === 'Move' ?
    (([f, ...r]) => f.toUpperCase()+r.join``)(displayFeature.activity) :
    displayFeature.name

  return (
    <Popup closeButton={false} className={popup}>
      <span>{content}</span>
    </Popup>
    )
}

export default FeaturePopup
