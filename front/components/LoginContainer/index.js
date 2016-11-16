import {connect} from 'react-redux'
import Login from '../Login'
import loginFormValidateAction from '../../store/actions/loginFormValidate'

const mapStateToProps = ({user: {id}, loginForm: {valid, errors, loading, redirect}}) => ({signedIn: !!id, valid, errors, loading, redirect})
const mapDispatchToProps = {
  onChange: form => (dispatch, getState) => loginFormValidateAction(dispatch, getState, form, false),
  onSubmit: form => (dispatch, getState) => loginFormValidateAction(dispatch, getState, form, true)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
