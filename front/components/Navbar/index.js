import React from 'react'

import Logo from '../Logo'
import LogInOutContainer from '../LogInOutContainer'

import {navbar, logo, handle, mapMode as mapModeStyle} from './style'

const Navbar = ({mapMode}) => (
  <span>
    <span className={handle} />
    <header className={`${navbar} ${mapMode ? mapModeStyle : ''}`}>
      <Logo className={logo} />
      <LogInOutContainer />
    </header>
  </span>
)

export default Navbar
