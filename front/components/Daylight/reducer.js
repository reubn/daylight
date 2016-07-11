 import getInitialState from './initialState'

 function RootReducer(state, action){
   if(typeof state === 'undefined') return getInitialState()
   if(action.type === 'LOGIN') return {...state, user: action.user}

   return state
 }

 export default RootReducer
