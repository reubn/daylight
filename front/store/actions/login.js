import axios from 'axios'
import {replace} from 'react-router-redux'

import User from '../../models/User'

function loginAction(dispatch, username, password){
  dispatch({type: 'LOGINFORM_ERRORS', errors: false})
  dispatch({type: 'LOGINFORM_LOADING'})
  axios.post('/login', {
    username, password
  })
  .then(function({data: user}){
    dispatch({type: 'USER', user: new User(user)})
    dispatch(replace('/map'))
    dispatch({type: 'LOGINFORM_LOADING', status: false})
  })
  .catch(function(error){
    dispatch({type: 'LOGINFORM_ERRORS'})
    dispatch({type: 'LOGINFORM_LOADING', status: false})
    console.log(error)
  })
}

export default loginAction
