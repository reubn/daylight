import moment from 'moment'

import Range from '../../models/Range'
import selectRange from '../actions/selectRange'

function goTomorrowAction(dispatch, getState){
  const {end} = getState().map.selected.range
  selectRange(dispatch, getState, new Range({start: moment(end).add(1, 'd')}))
}

export default goTomorrowAction
