import {connect} from 'react-redux'

import editFeatureAction from '../../../../../../store/actions/editFeature'

import EditLine from './EditLine'

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  editFeature: ({feature, payload}) => (dispatch, getState) => editFeatureAction(dispatch, getState, {feature, payload})
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLine)
