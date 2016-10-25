import axios from 'axios'
import {push} from 'react-router-redux'

import Day from '../../models/Day'
import Location from '../../models/Location'

function updateRangeAction(dispatch, getState, range, redirect=true){
  if(redirect) dispatch(push(`/map/${range.toURL()}`))
  dispatch({type: 'MAP_LOADING'})

  return axios.put(`/@/day/${range.toURL()}`)
    .then(function({data: {days, locations}}){
      const dayInstances = days.map(day => new Day(day))
      const locationInstances = locations.map(location => new Location(location))
      dispatch({type: 'CACHE_LOCATIONS', locations: locationInstances})
      dispatch({type: 'CACHE_DAYS', days: dayInstances, update: true})
      dispatch({type: 'SELECT_RANGE', range, days: dayInstances})
      dispatch({type: 'MAP_LOADING', status: false})
      return dayInstances
    })
}
export default updateRangeAction
