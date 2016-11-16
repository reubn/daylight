import React from 'react'
import {Route, IndexRoute} from 'react-router'

import store from './store'

import protect from './helpers/protect'

import App from './components/App'
import LoginContainer from './components/LoginContainer'
import MapContainer from './components/MapContainer'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={() => <span> HOMEPAGE </span>} />
    <Route path="/login" component={LoginContainer} onEnter={protect(store, null, '/map')} />
    <Route path="/map(/:from(/:to))" component={MapContainer} onEnter={protect(store, '/login')} />
  </Route>
)
