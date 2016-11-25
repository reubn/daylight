import {connect} from 'react-redux'

import selectRangeAction from '../../store/actions/selectRange'
import selectFeatureAction from '../../store/actions/selectFeature'
import goYesterdayAction from '../../store/actions/goYesterday'
import goTomorrowAction from '../../store/actions/goTomorrow'

import Map from '../Map'

const mapStateToProps = ({map: {selected, loading}, user: {homeLocation}}) => ({loading, selected, homeLocation})
const mapDispatchToProps = {
  selectRange: (...args) => (dispatch, getState) => selectRangeAction(dispatch, getState, ...args),
  selectFeature: displayFeature => (dispatch, getState) => selectFeatureAction(dispatch, getState, displayFeature),
  goYesterday: () => (dispatch, getState) => goYesterdayAction(dispatch, getState),
  goTomorrow: () => (dispatch, getState) => goTomorrowAction(dispatch, getState)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
