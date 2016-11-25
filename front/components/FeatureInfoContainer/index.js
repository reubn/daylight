import {connect} from 'react-redux'

import selectFeatureAction from '../../store/actions/selectFeature'

import FeatureInfo from '../FeatureInfo'

const mapStateToProps = ({map: {selected: {selectedFeature}}, aesthetics: {activityTypes, locationCategories}}) => ({feature: selectedFeature, activityTypes, locationCategories})
const mapDispatchToProps = {
  close: () => (dispatch, getState) => selectFeatureAction(dispatch, getState, null)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureInfo)
