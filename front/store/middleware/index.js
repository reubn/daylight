import {browserHistory} from 'react-router'
import {applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import error from './error'

export default compose(
  applyMiddleware(
    thunk,
    error,
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
