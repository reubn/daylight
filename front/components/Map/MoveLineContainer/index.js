import {connect} from 'react-redux'

import MoveLine from '../MoveLine'

const mapStateToProps = ({aesthetics: {activityTypes}}) => ({activityTypes})
const mapDispatchToProps = {
  selectFeature: displayFeature => ({type: 'SELECT_FEATURE', displayFeature})
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveLine)
