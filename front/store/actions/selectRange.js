import axios from 'axios'
import {replace} from 'react-router-redux'

import Range from '../../helpers/Range'
import getDayIdfromDate from '../../helpers/getDayIdfromDate'

function selectRangeAction(dispatch, getState, range, redirect=true){
  console.log('SRA', redirect)
  if(redirect) dispatch(replace(`/map/${range.toURL()}`))
  dispatch({type: 'MAP_LOADING'})

  const {cached: cachedDayIds, onServer: onServerDates} = range.toDates()
  .reduce(({cached, onServer}, date) => {
    const cachedDayId = getDayIdfromDate(getState, date)
    if(cachedDayId) return {cached: [...cached, cachedDayId], onServer}
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
  .then(arrayOfResponces => arrayOfResponces.reduce((flat, res) => [...flat, ...res.map(day => day.day.id)], []))
  .then(dayIdsFromServer => (console.log(dayIdsFromServer), [...cachedDayIds, ...dayIdsFromServer]))
  .then(dayIds => {
    console.log('1')
    dispatch({type: 'SELECT_RANGE', range, dayIds})
    dispatch({type: 'MAP_LOADING', status: false})
  })
}
export default selectRangeAction
