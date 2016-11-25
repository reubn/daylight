import {push} from 'react-router-redux'

function selectFeatureAction(dispatch, getState, displayFeature, redirect=true){
  let featureToDispatch

  if(displayFeature && displayFeature.id) featureToDispatch = displayFeature
  else {
    const search = getState().map.selected.displayFeatures.find(({id}) => id === displayFeature)
    if(search) featureToDispatch = search
  }

  if(!featureToDispatch){
    dispatch({type: 'SELECT_FEATURE', displayFeature: null})
    return dispatch(push(`/map/${getState().map.selected.range.toURL()}`))
  }

  if(redirect) dispatch(push(`/map/${getState().map.selected.range.toURL()}info/${featureToDispatch.id}/`))
  return dispatch({type: 'SELECT_FEATURE', displayFeature: featureToDispatch})
}

export default selectFeatureAction
