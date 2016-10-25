import React from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'

import './react-datepicker.css'

import Range from '../../models/Range'

import {rangeSelector, arrow, slash} from './style'
import StartDate from './StartDate.js'
import EndDate from './EndDate.js'

const RangeSelector = ({goYesterday, goTomorrow, selectRange, range, accountStartDay}) => {
  if(!range) return null

  const StartPicker = (
    <DatePicker
      customInput={<StartDate />}
      dateFormat="YYYYMMDD"
      minDate={moment(accountStartDay)}
      maxDate={moment()}
      showYearDropdown
      selectsStart
      startDate={range.start}
      endDate={range.end}
      selected={range.start}
      onChange={date => selectRange(new Range({start: date, end: range.date}))}
    />
)

  const EndPicker = (
    <DatePicker
      customInput={<EndDate />}
      dateFormat="YYYYMMDD"
      minDate={moment(accountStartDay)}
      maxDate={moment()}
      showYearDropdown
      selectsEnd
      startDate={range.start}
      endDate={range.end}
      selected={range.end}
      onChange={date => selectRange(new Range({start: range.start, end: date}))}
    />
)
  return (
    <span className={rangeSelector}>
      <span className={arrow} onClick={goYesterday}>&lt;-</span>
      {StartPicker}
      <span className={slash}>/</span>
      {EndPicker}
      <span className={arrow} onClick={goTomorrow}>-&gt;</span>
    </span>
  )}

export default RangeSelector
