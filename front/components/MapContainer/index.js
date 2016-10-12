import {connect} from 'react-redux'

import selectRangeAction from '../../store/actions/selectRange'
import goYesterdayAction from '../../store/actions/goYesterday'
import goTomorrowAction from '../../store/actions/goTomorrow'

import Map from '../Map'

const mapStateToProps = ({map: {selected}, user: {homeLocation}}) => ({selected, homeLocation})
const mapDispatchToProps = dispatch => ({
  selectRange: (...args) => dispatch((d, getState) => selectRangeAction(dispatch, getState, ...args)),
  goYesterday: () => dispatch((d, getState) => goYesterdayAction(dispatch, getState)),
  goTomorrow: () => dispatch((d, getState) => goTomorrowAction(dispatch, getState))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
