import {connect} from 'react-redux'
import Login from '../Login'
import loginFormValidateAction from '../../store/actions/loginFormValidate'

const mapStateToProps = ({user: {id}, loginForm: {valid, errors, loading}}) => ({signedIn: !!id, valid, errors, loading})
const mapDispatchToProps = {
  onChange: form => dispatch => loginFormValidateAction(dispatch, form, false),
  onSubmit: form => dispatch => loginFormValidateAction(dispatch, form, true)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
