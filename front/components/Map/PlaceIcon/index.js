import React from 'react'
import {divIcon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

import WithIcon from './WithIcon'
import WithoutIcon from './WithoutIcon'

const PlaceIcon = ({placeCategories, feature}) => {
  const cat = placeCategories[feature.cat]

  if(cat.url) return <WithIcon feature={feature} cat={cat} />
  return <WithoutIcon feature={feature} />
}


export default PlaceIcon
