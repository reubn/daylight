import axios from 'axios'
import {replace} from 'react-router-redux'

import User from '../../models/User'

function loginAction(dispatch, form){
  dispatch({type: 'LOGINFORM_LOADING'})
  axios.post('/login', form)
  .then(function({data: user}){
    dispatch({type: 'USER', user: new User(user)})
    dispatch(replace('/map'))
    dispatch({type: 'LOGINFORM_LOADING', status: false})
  })
  .catch(function(error){
    dispatch({type: 'LOGINFORM_ERRORS', errors: {password: {valid: false, reason: 'password incorrect'}}})
    dispatch({type: 'LOGINFORM_LOADING', status: false})
    console.log(error)
  })
}

export default loginAction
