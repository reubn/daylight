import axios from 'axios'
import {replace} from 'react-router-redux'

function logoutAction(dispatch){
  axios.post('/logout')
  .then(() => {
    dispatch({type: 'USER', user: {}})
    dispatch(replace('/'))
  })
  .catch(error => console.error(error))
}

export default logoutAction
