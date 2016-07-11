import axios from 'axios'

function loginAction(dispatch, username, password){
  axios.post('/login', {
    username, password
  })
  .then(function({data: user}){
    console.log(user)
    dispatch({type: 'LOGIN', user})
  })
  .catch(function(error){
    console.log(error)
  })
}

export default loginAction
