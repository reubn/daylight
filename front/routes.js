import React from 'react'
import {Route, IndexRoute} from 'react-router'

import store from './store'

import protect from './helpers/protect'

import App from './components/App'
import LoginContainer from './components/LoginContainer'
import MapContainer from './components/MapContainer'

export default (
  <Route path="/" component={App}>
    {/* Index and Login */}
    <IndexRoute component={() => <span> HOMEPAGE </span>} />
    <Route path="/login" component={LoginContainer} onEnter={protect(store, null, '/map')} />

    {/* Map */}
    <Route path="/map" component={MapContainer} onEnter={protect(store, '/login')} />

    {/* Feature Info */}
    <Route path="/map/:from/info/:feature" component={MapContainer} onEnter={protect(store, '/login')} />
    <Route path="/map/:from/:to/info/:feature" component={MapContainer} onEnter={protect(store, '/login')} />
    {/* Standard */}
    <Route path="/map/:from" component={MapContainer} onEnter={protect(store, '/login')} />
    <Route path="/map/:from/:to" component={MapContainer} onEnter={protect(store, '/login')} />
  </Route>
)
