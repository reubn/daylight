import {connect} from 'react-redux'

import PlaceIcon from '../PlaceIcon'

const mapStateToProps = ({activities}) => ({activities})

export default connect(mapStateToProps)(PlaceIcon)
