import React from 'react'

import LogoContainer from '../LogoContainer'
import LogInOutContainer from '../LogInOutContainer'

import {navbar, logo, handle, mapMode as mapModeStyle} from './style'

const Navbar = ({mapMode}) => (
  <span>
    <span className={handle} />
    <header className={`${navbar} ${mapMode ? mapModeStyle : ''}`}>
      <LogoContainer className={logo} />
      <LogInOutContainer />
    </header>
  </span>
)

export default Navbar
