import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'MAP_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}

  if(action.type === 'ADD_DAYS') return {...state, days: [...state.days, ...action.days]}
  if(action.type === 'SELECT_DAYS') return {...state, selected: action.days}
  return state
}

export default mapReducer
