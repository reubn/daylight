import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'MAP_LOADING') return {...state, loading: action.status}
  return state
}

export default mapReducer
