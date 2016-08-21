import moment from 'moment'
import {replace} from 'react-router-redux'

function goTomorrowAction(dispatch, getState){
  const today = moment(getState().map.selected[0].day.date)
  return dispatch(replace(`/map/${today.add(1, 'd').format('YYYYMMDD')}`))
}

export default goTomorrowAction
