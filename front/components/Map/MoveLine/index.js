import React from 'react'

import {Popup} from 'react-leaflet'

import GradientPolyline from './GradientPolyline'

const MoveLine = ({activityTypes, displayFeature}) =>
  <GradientPolyline
    id={displayFeature.id}
    gradient={activityTypes[displayFeature.activity].map((colour, index, array) => ({offset: (100 * index) / (array.length - 1), colour}))}
    opacity={0.9}
    weight={5}
    positions={displayFeature.geo}
    onMouseover={function(){this.bringToFront()}}
    onMousemove={function(e){this._openPopup(e)}}
    onMouseout={function(){this.bringToBack(); this.closePopup()}}
  >
    <Popup closeButton={false}><span>{displayFeature.activity}</span></Popup>
  </GradientPolyline>

export default MoveLine
