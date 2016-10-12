import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT') return initialState

  if(action.type === 'MAP_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}

  if(action.type === 'CACHE_LOCATIONS') return {...state, cache: {...state.cache, locations: {...state.locations, ...action.locations.reduce((interLocations, {cat, name, geo, id}) => ({...interLocations, [id]: {cat, name, geo}}), {})}}}

  if(action.type === 'CACHE_DAYS'){
    const transformed = action.days.map(({day, features}) => {
      const displayFeatures = features.reduce((done, feature) => {
        if(feature.type !== 'Visit') return [...done, feature]

        const locationInDone = done.find(l => l.id === feature.location)
        const location = locationInDone || {...state.cache.locations[feature.location]}
        if(!location) throw new Error('Location was not sent')

        location.id = feature.location
        location.visits = location.visits ? [...location.visits, feature] : [feature]

        if(locationInDone) return done
        return [...done, location]
      }, [])
      console.log({day, displayFeatures})
      return {day, displayFeatures}
    })
    return {...state, cache: {...state.cache, days: [...state.cache.days, ...transformed]}}
  }
  if(action.type === 'SELECT_DAYS'){
    return {...state, selected: {...state.selected, days: state.cache.days.filter(({day: {id}}) => action.dayIds.includes(id))}}
  }
  return state
}

export default mapReducer
