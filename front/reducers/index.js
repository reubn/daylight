import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'
import user from './user'
import map from './map'

const reducers = {
  routing: routerReducer,
  user,
  map
}

export default combineReducers(reducers)
