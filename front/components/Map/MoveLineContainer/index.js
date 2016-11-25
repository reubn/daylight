import {connect} from 'react-redux'

import selectFeatureAction from '../../../store/actions/selectFeature'

import MoveLine from '../MoveLine'

const mapStateToProps = ({aesthetics: {activityTypes}}) => ({activityTypes})
const mapDispatchToProps = {
  selectFeature: displayFeature => (dispatch, getState) => selectFeatureAction(dispatch, getState, displayFeature)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveLine)
