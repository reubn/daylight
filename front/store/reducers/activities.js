import initialState from '../initials/map'

const activitesReducer = (state=initialState, action) => {
  if(action.type === 'ACTIVITIES_UPDATE') return {...state, ...action.activities}
  return state
}

export default activitesReducer
