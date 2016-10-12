import axios from 'axios'
import moment from 'moment'
import {replace} from 'react-router-redux'

function loginAction(dispatch, username, password){
  axios.post('/login', {
    username, password
  })
  .then(function({data: user}){
    dispatch({type: 'USER', user})
    dispatch(replace('/map'))
  })
  .catch(function(error){
    console.log(error)
  })
}

export default loginAction
