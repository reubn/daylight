import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'
import user from './user'
import map from './map'
import activities from './activities'

const reducers = {
  routing: routerReducer,
  user,
  map,
  activities
}

export default combineReducers(reducers)
