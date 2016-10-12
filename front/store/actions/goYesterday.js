import moment from 'moment'

import Range from '../../helpers/Range'
import selectRange from '../actions/selectRange'

function goYesterdayAction(dispatch, getState){
  const {start} = getState().map.selected.range
  selectRange(dispatch, getState, new Range({start: moment(start).subtract(1, 'd')}))
}

export default goYesterdayAction
