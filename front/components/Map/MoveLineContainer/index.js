import {connect} from 'react-redux'

import MoveLine from '../MoveLine'

const mapStateToProps = ({aesthetics: {activityTypes}}) => ({activityTypes})

export default connect(mapStateToProps)(MoveLine)
