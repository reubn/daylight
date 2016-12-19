import {connect} from 'react-redux'

import selectFeatureAction from '../../store/actions/selectFeature'

import FeatureInfo from './FeatureInfo'

const mapStateToProps = ({map: {selected: {selectedFeature, editingFeature}}, aesthetics: {activityTypes, locationCategories}}) => ({feature: selectedFeature, editing: selectedFeature &&editingFeature && editingFeature.id === selectedFeature.id, activityTypes, locationCategories})
const mapDispatchToProps = {
  close: () => (dispatch, getState) => selectFeatureAction(dispatch, getState, null),
  edit: displayFeature => ({type: 'SELECT_EDIT_FEATURE', displayFeature})
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureInfo)
