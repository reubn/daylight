import React from 'react'
import {divIcon} from 'leaflet'
import {Marker} from 'react-leaflet'

import {marker} from './style'

export default ({feature}) => (<Marker position={feature.geo} icon={divIcon({className: marker, iconSize: [20, 20]})} />)
