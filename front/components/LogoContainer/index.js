import {connect} from 'react-redux'
import Logo from './Logo'

const mapStateToProps = ({user: {birthday, loggedIn}}) => ({birthday: birthday.isSame(new Date(), 'd') && loggedIn})

export default connect(mapStateToProps)(Logo)
