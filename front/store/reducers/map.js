import initialState from '../initials/map'

const mapReducer = (state=initialState, action) => {
  if(action.type === 'LOGOUT') return initialState

  if(action.type === 'MAP_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}
  if(action.type === 'MAP_UPDATING') return {...state, updating: action.hasOwnProperty('status') ? action.status : true}

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
    return {...state, selected: {...state.selected, range: action.range, selectedFeature: (state.selected.selectedFeature !== null && displayFeatures.find(({id}) => id === state.selected.selectedFeature.id)) || null, displayFeatures}}
  }

  if(action.type === 'SELECT_FEATURE') return {...state, selected: {...state.selected, selectedFeature: action.displayFeature}}
  if(action.type === 'SELECT_EDIT_FEATURE') return {...state, selected: {...state.selected, editingFeature: action.displayFeature}}


  if(action.type === 'EDIT_FEATURE'){
    const {day: dayId, id} = action.feature

    const newDayCache = state.cache.days.reduce((done, day) => {
      const {id: currentId} = day

      if(currentId !== dayId) return [...done, day]
      return [...done, Object.assign({}, day, {features: day.features.map(feature => feature.id === id ? action.feature : feature)})]
    }, [])

    return {...state, cache: {...state.cache, days: newDayCache}}
  }

  if(action.type === 'EDIT_LOCATION'){
    const {id} = action.location
    return {...state, cache: {...state.cache, locations: {...state.cache.locations, [id]: action.location}}}
  }

  return state
}

export default mapReducer
