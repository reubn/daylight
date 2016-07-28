import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import appReducer from './reducer'
import getInitialState from './initialState'

import userAction from '../../actions/user'

import LoginContainer from '../LoginContainer'
import MapContainer from '../MapContainer'

import {app} from './style'

function Daylight(){
  this.store = createStore(
    combineReducers({daylight: appReducer, routing: routerReducer}),
    {daylight: getInitialState()},
   compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
 )

 // See if we have session
  userAction(this.store.dispatch)

  const history = syncHistoryWithStore(browserHistory, this.store)

  render(
    <Provider store={this.store}>
      <section className={app}>
        <Router history={history}>
          <Route path="/" component={MapContainer} />
          <Route path="/login" component={LoginContainer} />
        </Router>
      </section>
    </Provider>, document.getElementById('daylight'))
  return this
}
export default Daylight
