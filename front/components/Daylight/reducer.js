 import getInitialState from './initialState'

 function RootReducer(state, action){
   if(typeof state === 'undefined') return getInitialState()
   if(action.type === 'USER') return {...state, user: action.user, haveUserInfo: true}

   return state
 }

 export default RootReducer
