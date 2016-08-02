import React from 'react'

import Navbar from '../Navbar'

import {app, wrapped} from './style'

const App = ({location: {pathname}, children}) => {
  const mapMode = pathname.startsWith('/map')
  return (
    <section className={app}>
      <Navbar mapMode={mapMode} />
      <span className={mapMode ? undefined : wrapped}>{children}</span>
    </section>
  )
}

export default App
