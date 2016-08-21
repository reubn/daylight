import moment from 'moment'
import {replace} from 'react-router-redux'

function goYesterdayAction(dispatch, getState){
  const today = moment(getState().map.selected[0].day.date)
  return dispatch(replace(`/map/${today.subtract(1, 'd').format('YYYYMMDD')}`))
}

export default goYesterdayAction
