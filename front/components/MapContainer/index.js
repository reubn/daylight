import {connect} from 'react-redux'

import selectDayAction from '../../store/actions/selectDay'

import Map from '../Map'

const mapStateToProps = ({map, user: {homeLocation}}) => ({...map, homeLocation})
const mapDispatchToProps = dispatch => ({selectDay: (from, to) => dispatch((d, getState) => selectDayAction(dispatch, getState, from, to))})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
