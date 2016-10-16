import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT') return initialState

  if(action.type === 'MAP_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}

  if(action.type === 'CACHE_LOCATIONS') return {...state, cache: {...state.cache, locations: {...state.cache.locations, ...action.locations.reduce((interLocations, {cat, name, geo, id}) => ({...interLocations, [id]: {cat, name, geo}}), {})}}}

  if(action.type === 'CACHE_DAYS'){
    const replace = action.hasOwnProperty('update') ? action.status : false
    const days = replace ? action.days.reduce((cache, day) => {
      const index = cache.findIndex(cacheDay => cacheDay.day.id === day.day.id)
      if(index === -1) return [...cache, day]
      cache[index] = day
      return cache
    }, state.cache.days) : action.days

    return {...state, cache: {...state.cache, days}}
  }

  if(action.type === 'SELECT_RANGE'){
    const displayFeatures = action.days
    .reduce((flatFeatures, {features}) => [...flatFeatures, ...features], [])
    .reduce((allDisplayFeatures, feature) => {
      if(feature.type !== 'Visit') return [...allDisplayFeatures, feature]
      const locationInDone = allDisplayFeatures.find(l => l.id === feature.location)
      const location = locationInDone || {...state.cache.locations[feature.location]}
      if(!location) throw new Error('Location was not sent')

      location.id = feature.location
      location.visits = location.visits ? [...location.visits, feature] : [feature]

      if(locationInDone) return allDisplayFeatures
      return [...allDisplayFeatures, location]
    }, [])
    return {...state, selected: {...state.selected, range: action.range, displayFeatures}}
  }
  return state
}

export default mapReducer
