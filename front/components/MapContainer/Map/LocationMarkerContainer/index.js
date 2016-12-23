import {connect} from 'react-redux'

import selectFeatureAction from '../../../../store/actions/selectFeature'

import LocationMarker from './LocationMarker'

const mapStateToProps = ({aesthetics: {locationCategories, iconImageSize}}) => ({locationCategories, iconImageSize})
const mapDispatchToProps = {
  selectFeature: displayFeature => (dispatch, getState) => selectFeatureAction(dispatch, getState, displayFeature)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationMarker)
