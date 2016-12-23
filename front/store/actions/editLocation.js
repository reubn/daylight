import axios from 'axios'

import Location from '../../models/Location'

import selectRangeAction from './selectRange'

function editLocationAction(dispatch, getState, {feature: {id}, payload}, reselect=true){
  dispatch({type: 'MAP_LOADING'})
  dispatch({type: 'MAP_UPDATING'})

  const range = getState().map.selected.range

  return axios.patch(`/-/location/${id}`, {payload})
    .then(function({data: newLocation}){
      const newLocationInstance = new Location(newLocation)
      dispatch({type: 'EDIT_LOCATION', location: newLocationInstance})

      if(reselect) selectRangeAction(dispatch, getState, range)

      dispatch({type: 'MAP_LOADING', status: false})
      dispatch({type: 'MAP_UPDATING', status: false})

      return newLocationInstance
    })
    .catch(error => dispatch({type: 'ERROR', error}))
}
export default editLocationAction
