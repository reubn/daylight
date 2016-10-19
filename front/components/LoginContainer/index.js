import {connect} from 'react-redux'
import Login from '../Login'
import loginAction from '../../store/actions/login'

const mapStateToProps = ({user: {id}}) => ({signedIn: !!id})
const mapDispatchToProps = {
  onSubmit: ({username, password}) => dispatch => loginAction(dispatch, username, password)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
