import axios from 'axios'

import haveDay from '../../helpers/haveDay'

function selectDayAction(dispatch, getState, from, to){
  // TODO NO SHIP ADDAPT 'haveDay'
  const localDay = haveDay(getState, from)
  if(localDay) return dispatch({type: 'SELECT_DAYS', dayIds: [localDay.day.id]})

  dispatch({type: 'MAP_LOADING'})
  axios.get(`/@/day/${from.format('YYYYMMDD')}/${to ? to.format('YYYYMMDD') : ''}`)
  .then(function({data: {days, locations}}){
    dispatch({type: 'ADD_LOCATIONS', locations})
    dispatch({type: 'ADD_DAYS', days})
    dispatch({type: 'SELECT_DAYS', dayIds: days.map(({day: {id}}) => id)})
    dispatch({type: 'MAP_LOADING', status: false})
  })
  .catch(function(error){
    console.log(error)
    dispatch({type: 'MAP_LOADING', status: false})
  })
}

export default selectDayAction
