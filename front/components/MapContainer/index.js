import {connect} from 'react-redux'
import Map from '../Map'

const mapStateToProps = ({map, user: {homeLocation}}) => ({...map, homeLocation})

export default connect(mapStateToProps)(Map)
