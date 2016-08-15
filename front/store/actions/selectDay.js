import axios from 'axios'

import haveDay from '../../helpers/haveDay'

function selectDayAction(dispatch, getState, from){
  const localDay = haveDay(getState, from)
  if(localDay) return dispatch({type: 'SELECT_DAYS', days: [localDay]})

  dispatch({type: 'MAP_LOADING'})
  axios.get(`/@/day/${from.format('YYYYMMDD')}`)
  .then(function({data: days}){
    console.log(days)
    dispatch({type: 'ADD_DAYS', days})
    dispatch({type: 'SELECT_DAYS', days})
    dispatch({type: 'MAP_LOADING', status: false})
  })
  .catch(function(error){
    console.log(error)
    dispatch({type: 'MAP_LOADING', status: false})
  })
}

export default selectDayAction
