import {connect} from 'react-redux'

import FeatureInfo from '../FeatureInfo'

const mapStateToProps = ({map: {selected: {selectedFeature}}, aesthetics: {activityTypes}}) => ({feature: selectedFeature, activityTypes})
const mapDispatchToProps = {
  close: () => ({type: 'SELECT_FEATURE', displayFeature: null})
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureInfo)
