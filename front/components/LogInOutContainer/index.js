import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

import logoutAction from '../../store/actions/logout'

import LogInOut from '../LogInOut'

const mapStateToProps = ({user: {loggedIn}}) => ({loggedIn})
const mapDispatchToProps = {
  login: () => replace('/login'),
  logout: () => dispatch => logoutAction(dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInOut)
