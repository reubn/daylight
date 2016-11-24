import logoutAction from '../actions/logout'

export default ({dispatch}) => next => action => {
  // Check if it is an error
  if(action.type !== 'ERROR') return next(action)
  const {error} = action

  // Request Errors
  if(error.response){
    const {response: {data: {reason}}} = error
    if(reason === 'NoAuth') logoutAction(dispatch)
  }
  throw error
}
