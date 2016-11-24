import axios from 'axios'
import {replace} from 'react-router-redux'

function logoutAction(dispatch){
  axios.post('/logout')
  .then(() => {
    dispatch({type: 'LOGOUT'})
    dispatch(replace('/'))
  })
  .catch(error => dispatch({type: 'ERROR', error}))
}

export default logoutAction
