import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT') return initialState

  if(action.type === 'MAP_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}

  if(action.type === 'CACHE_LOCATIONS'){
    const newLocations = action.locations.reduce((interLocations, location) => ({...interLocations, [location.id]: location}), {})
    return {...state, cache: {...state.cache, locations: {...state.cache.locations, ...newLocations}}}
  }

  if(action.type === 'CACHE_DAYS'){
    const replace = action.hasOwnProperty('update') ? action.update : false
    const days = replace ? action.days.reduce((cache, day) => {
      const index = cache.findIndex(cacheDay => cacheDay.id === day.id)
      if(index === -1) return [...cache, day]
      cache[index] = day
      return cache
    }, state.cache.days) : [...state.cache.days, ...action.days]

    return {...state, cache: {...state.cache, days}}
  }

  if(action.type === 'SELECT_RANGE'){
    const displayFeatures = action.days
    .reduce((flatFeatures, {features}) => [...flatFeatures, ...features], [])
    .reduce((allDisplayFeatures, feature) => {
      // If is not a Visit, just append to list of displayFeatures
      console.log(feature)
      if(feature.type !== 'Visit') return [...allDisplayFeatures, feature]

      // Search in the displayFeatures we have already created, and try to find a Location that matches this Visit's id
      const locationInDisplayFeatures = allDisplayFeatures.find(location => location.id === feature.location)

      // If we do not find one, clone the Location from the Location cache
      const location = locationInDisplayFeatures || Object.assign(Object.create(state.cache.locations[feature.location]), state.cache.locations[feature.location])

      // Add this Visit to the Location's visits array
      location.visits = location.visits ? [...location.visits, feature] : [feature]

      // If the Location was found in our displayFeatures then we can just return it, as we've overridden the previous copy held there
      if(locationInDisplayFeatures) return allDisplayFeatures

      // Else, append it to the end of displayFeatures
      return [...allDisplayFeatures, location]
    }, [])
    return {...state, selected: {...state.selected, range: action.range, selectedFeature: (state.selected.selectedFeature !== null && displayFeatures.some(({id}) => id === state.selected.selectedFeature.id)) ? state.selected.selectedFeature : null, displayFeatures}}
  }

  if(action.type === 'SELECT_FEATURE') return {...state, selected: {...state.selected, selectedFeature: action.displayFeature}}

  return state
}

export default mapReducer
