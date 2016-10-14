import React from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'

import './react-datepicker.css'

import Range from '../../helpers/Range'

import {rangeSelector, arrow, slash, start, end} from './style'

const RangeSelector = ({goYesterday, goTomorrow, selectRange, range, accountStartDay}) => {
  if(!range) return null

  const StartDate = props => <span className={start} onClick={props.onClick}>{props.value}</span>
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

  const EndDate = props => <span className={end} onClick={props.onClick}>{props.value}</span>
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
