import {connect} from 'react-redux'

import updateRangeAction from '../../store/actions/updateRange'

import UpdateButton from '../UpdateButton'

const mapStateToProps = ({map: {selected: {range}}}) => ({range})
const mapDispatchToProps = {
  updateRange: (...args) => (dispatch, getState) => updateRangeAction(dispatch, getState, ...args)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateButton)
