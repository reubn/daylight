import React from 'react'

import {mapnav, arrow, start, slash, end} from './style'

const MapNav = ({goYesterday, goTomorrow, selectRange, range}) => {
  const freeRange = range || {}
  const startDisplay = freeRange.start ? range.start.format('YYYYMMDD') : null
  const endDisplay = (freeRange.end && !freeRange.start.isSame(freeRange.end)) ? range.end.format('YYYYMMDD') : null
  return (
    <span className={mapnav}>
      <span className={arrow}>&lt;-</span>
      <span className={start}>{startDisplay}</span>
      <span className={slash}>/</span>
      <span className={end}>{endDisplay}</span>
      <span className={arrow}>-&gt;</span>
    </span>
  )}

export default MapNav
