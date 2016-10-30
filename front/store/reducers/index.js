import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'
import user from './user'
import map from './map'
import aesthetics from './aesthetics'
import loginForm from './loginForm'

const reducers = {
  routing: routerReducer,
  user,
  map,
  aesthetics,
  loginForm
}

export default combineReducers(reducers)
