import {connect} from 'react-redux'
import Map from '../Map'

const mapStateToProps = ({daylight: {user: {homeLocation=[0, 0]}}}) => ({homeLocation})

export default connect(mapStateToProps)(Map)
