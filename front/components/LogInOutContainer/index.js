import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

import logoutAction from '../../store/actions/logout'

import LogInOut from '../LogInOut'

const mapStateToProps = ({user: {id}}) => ({signedIn: !!id})
const mapDispatchToProps = dispatch => ({login: () => dispatch(replace('/login')), logout: () => logoutAction(dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(LogInOut)
