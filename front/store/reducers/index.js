import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'
import user from './user'
import map from './map'
import aesthetics from './aesthetics'

const reducers = {
  routing: routerReducer,
  user,
  map,
  aesthetics
}

export default combineReducers(reducers)
