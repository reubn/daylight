import initialState from '../initials/user'

import User from '../../models/User'

const userReducer = (state=initialState, action) => {
  if(action.type === 'USER') return action.user
  if(action.type === 'LOGOUT') return new User()

  return state
}

export default userReducer
