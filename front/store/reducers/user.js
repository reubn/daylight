import initialState from '../initials/user'

const userReducer = (state=initialState, action) => {
  if(action.type === 'USER') return action.user
  if(action.type === 'LOGOUT') return {}

  return state
}

export default userReducer
