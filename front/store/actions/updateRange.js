import axios from 'axios'
import {push} from 'react-router-redux'


function updateRangeAction(dispatch, getState, range, redirect=true){
  if(redirect) dispatch(push(`/map/${range.toURL()}`))
  dispatch({type: 'MAP_LOADING'})

  return axios.put(`/@/day/${range.toURL()}`)
    .then(function({data: {days, locations}}){
      dispatch({type: 'CACHE_LOCATIONS', locations})
      dispatch({type: 'CACHE_DAYS', update: true, days})
      dispatch({type: 'SELECT_RANGE', range, days})
      dispatch({type: 'MAP_LOADING', status: false})
      return days
    })
}
export default updateRangeAction
