import axios from 'axios'

function userAction(dispatch){
  axios.post('/@/user')
  .then(function({data: user}){
    dispatch({type: 'LOGIN', user})
  })
  .catch(() => null)
}

export default userAction
