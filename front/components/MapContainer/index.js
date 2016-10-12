import {connect} from 'react-redux'

import selectDayAction from '../../store/actions/selectDay'
import goYesterdayAction from '../../store/actions/goYesterday'
import goTomorrowAction from '../../store/actions/goTomorrow'

import Map from '../Map'

const mapStateToProps = ({map: {selected}, user: {homeLocation}}) => ({selected, homeLocation})
const mapDispatchToProps = dispatch => ({
  selectDay: (from, to) => dispatch((d, getState) => selectDayAction(dispatch, getState, from, to)),
  goYesterday: () => dispatch((d, getState) => goYesterdayAction(dispatch, getState)),
  goTomorrow: () => dispatch((d, getState) => goTomorrowAction(dispatch, getState))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
