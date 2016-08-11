import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'MAP_LOADING') return {...state, loading: action.status || true}
  return state
}

export default mapReducer
