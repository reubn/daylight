import axios from 'axios'
import {push} from 'react-router-redux'

import Range from '../../helpers/Range'
import getDayFromDate from '../../helpers/getDayFromDate'

function selectRangeAction(dispatch, getState, range, redirect=true){
  if(redirect) dispatch(push(`/map/${range.toURL()}`))
  dispatch({type: 'MAP_LOADING'})

  const {cached: cachedDays, onServer: onServerDates} = range.toDates()
  .reduce(({cached, onServer}, date) => {
    const cachedDay = getDayFromDate(getState, date)
    if(cachedDay) return {cached: [...cached, cachedDay], onServer}
    return {cached, onServer: [...onServer, date]}
  }, {cached: [], onServer: []})

  const serverPromises = Range.datesToRanges(onServerDates)
  .reduce((promises, serverRange) =>
    [...promises, axios.get(`/@/day/${serverRange.toURL()}`)
    .then(function({data: {days, locations}}){
      dispatch({type: 'CACHE_LOCATIONS', locations})
      dispatch({type: 'CACHE_DAYS', days})
      return days
    })], []
  )
  Promise.all(serverPromises)
  .then(arrayOfResponces => arrayOfResponces.reduce((flat, res) => [...flat, ...res], []))
  .then(daysFromServer => [...cachedDays, ...daysFromServer])
  .then(days => {
    dispatch({type: 'SELECT_RANGE', range, days})
    dispatch({type: 'MAP_LOADING', status: false})
  })
}
export default selectRangeAction
