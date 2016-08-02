import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import protect from './helpers/protect'

import reducers from './reducers'
import initials from './initials'

import App from './components/App'
import LoginContainer from './components/LoginContainer'
import MapContainer from './components/MapContainer'

function Daylight(){
  this.store = createStore(
    reducers,
    initials,
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
    </Provider>, document.getElementById('app'))
  return this
}

window.daylight = new Daylight()
