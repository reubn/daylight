import axios from 'axios'
import {push} from 'react-router-redux'

import Range from '../../models/Range'
import Day from '../../models/Day'
import Location from '../../models/Location'


function selectRangeAction(dispatch, getState, range, redirect=true){
  if(redirect) dispatch(push(`/map/${range.toURL()}`))
  dispatch({type: 'MAP_LOADING'})

  const {cached: cachedDays, onServer: onServerDates} = range.toDates()
  .reduce(({cached, onServer}, date) => {
    const cachedDay = Day.fromDate(getState, date)
    if(cachedDay) return {cached: [...cached, cachedDay], onServer}
    return {cached, onServer: [...onServer, date]}
  }, {cached: [], onServer: []})

  const serverPromises = Range.datesToRanges(onServerDates)
  .reduce((promises, serverRange) =>
    [...promises, axios.get(`/@/day/${serverRange.toURL()}`)
    .then(function({data: {days, locations}}){
      const dayInstances = days.map(day => new Day(day))
      const locationInstances = locations.map(location => new Location(location))
      dispatch({type: 'CACHE_LOCATIONS', locations: locationInstances})
      dispatch({type: 'CACHE_DAYS', days: dayInstances})
      return dayInstances
    })
    .catch(error => dispatch({type: 'ERROR', error}))
    ], []
  )

  return Promise.all(serverPromises)
  .then(arrayOfResponces => arrayOfResponces.reduce((flat, res) => [...flat, ...res], []))
  .then(daysFromServer => [...cachedDays, ...daysFromServer])
  .then(days => {
    dispatch({type: 'SELECT_RANGE', range, days})
    dispatch({type: 'MAP_LOADING', status: false})
  })
}
export default selectRangeAction
