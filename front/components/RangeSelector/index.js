import React from 'react'

import {rangeSelector, arrow, start, slash, end} from './style'

const RangeSelector = ({goYesterday, goTomorrow, selectRange, range}) => {
  const freeRange = range || {}
  const startDisplay = freeRange.start ? range.start.format('YYYYMMDD') : null
  const endDisplay = (freeRange.end && !freeRange.start.isSame(freeRange.end)) ? range.end.format('YYYYMMDD') : null
  return (
    <span className={rangeSelector}>
      <span className={arrow} onClick={goYesterday}>&lt;-</span>
      <span className={start}>{startDisplay}</span>
      <span className={slash}>/</span>
      <span className={end}>{endDisplay}</span>
      <span className={arrow} onClick={goTomorrow}>-&gt;</span>
    </span>
  )}

export default RangeSelector
