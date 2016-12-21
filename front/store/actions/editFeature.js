import axios from 'axios'

import Feature from '../../models/Feature'

import selectRangeAction from './selectRange'

function editFeatureAction(dispatch, getState, {feature: {id, dayId}, payload}, reselect=true){
  dispatch({type: 'MAP_LOADING'})
  dispatch({type: 'MAP_UPDATING'})

  const range = getState().map.selected.range

  return axios.patch(`/-/feature/${id}`, {dayId, payload})
    .then(function({data: newFeature}){
      const newFeatureInstance = new Feature(newFeature)
      dispatch({type: 'EDIT_FEATURE', feature: newFeatureInstance})

      if(reselect) selectRangeAction(dispatch, getState, range)

      dispatch({type: 'MAP_LOADING', status: false})
      dispatch({type: 'MAP_UPDATING', status: false})

      return newFeatureInstance
    })
    .catch(error => dispatch({type: 'ERROR', error}))
}
export default editFeatureAction
