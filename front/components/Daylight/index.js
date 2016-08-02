import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import protect from '../../helpers/protect'

import appReducer from './reducer'
import getInitialState from './initialState'

import App from '../App'

import LoginContainer from '../LoginContainer'
import MapContainer from '../MapContainer'

function Daylight(){
  this.store = createStore(
    combineReducers({daylight: appReducer, routing: routerReducer}),
    {daylight: getInitialState()},
   compose(applyMiddleware(thunk), applyMiddleware(routerMiddleware(browserHistory)), window.devToolsExtension ? window.devToolsExtension() : f => f)
 )
  this.history = syncHistoryWithStore(browserHistory, this.store)

  render(
    <Provider store={this.store}>
      <Router history={this.history}>
        <Route path="/" component={App}>
          <IndexRoute component={() => <span> HOMEPAGE </span>} />
          <Route path="/login" component={LoginContainer} onEnter={protect(this.store, null, '/map')} />
          <Route path="/map(/:from(/:to))" component={MapContainer} onEnter={protect(this.store, '/')} />
        </Route>
      </Router>
    </Provider>, document.getElementById('daylight'))
  return this
}
export default Daylight
