import {connect} from 'react-redux'

import selectRangeAction from '../../store/actions/selectRange'
import goYesterdayAction from '../../store/actions/goYesterday'
import goTomorrowAction from '../../store/actions/goTomorrow'

import RangeSelector from '../RangeSelector'

const mapStateToProps = ({map: {selected: {range}}}) => ({range})
const mapDispatchToProps = dispatch => ({
  selectRange: (...args) => dispatch((d, getState) => selectRangeAction(dispatch, getState, ...args)),
  goYesterday: () => dispatch((d, getState) => goYesterdayAction(dispatch, getState)),
  goTomorrow: () => dispatch((d, getState) => goTomorrowAction(dispatch, getState))
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector)
