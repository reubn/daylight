import {connect} from 'react-redux'
import Login from '../Login'
import loginAction from '../../actions/login'

const mapStateToProps = ({daylight: {user: {id}}}) => ({signedIn: !!id})
const mapDispatchToProps = dispatch => ({onSubmit: ({username, password}) => loginAction(dispatch, username, password)})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
