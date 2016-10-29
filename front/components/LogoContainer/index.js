import {connect} from 'react-redux'
import Logo from '../Logo'

const mapStateToProps = ({user: {birthday}}) => ({birthday: birthday.isSame(new Date(), 'd')})

export default connect(mapStateToProps)(Logo)
