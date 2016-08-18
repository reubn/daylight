import {connect} from 'react-redux'

import MoveLine from '../MoveLine'

const mapStateToProps = ({activities}) => ({activities})

export default connect(mapStateToProps)(MoveLine)
