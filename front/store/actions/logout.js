import axios from 'axios'
import {replace} from 'react-router-redux'

function logoutAction(dispatch){
  axios.post('/logout')
  .then(() => {
    dispatch({type: 'LOGOUT'})
    dispatch(replace('/'))
  })
  .catch(error => console.error(error))
}

export default logoutAction
