import {connect} from 'react-redux'

import editLocationAction from '../../../../../../store/actions/editLocation'

import EditMarker from './EditMarker'

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  editLocation: ({feature, payload}) => (dispatch, getState) => editLocationAction(dispatch, getState, {feature, payload})
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMarker)
