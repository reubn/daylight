import {connect} from 'react-redux'

import updateRangeAction from '../../store/actions/updateRange'

import UpdateButton from '../UpdateButton'

const mapStateToProps = ({map: {selected: {range}}}) => ({range})
const mapDispatchToProps = dispatch => ({
  updateRange: (...args) => dispatch((d, getState) => updateRangeAction(dispatch, getState, ...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateButton)
