import {connect} from 'react-redux'
import Map from '../Map'

const mapStateToProps = ({user: {homeLocation}}) => ({homeLocation})

export default connect(mapStateToProps)(Map)
