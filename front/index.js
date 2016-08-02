import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {createStore} from 'redux'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import protect from './helpers/protect'

import reducers from './reducers'
import initials from './initials'
import middleware from './middleware'

import App from './components/App'
import LoginContainer from './components/LoginContainer'
import MapContainer from './components/MapContainer'

function Daylight(){
  this.store = createStore(
    reducers,
    initials,
    middleware
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
