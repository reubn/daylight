import React from 'react'

import Logo from '../Logo'
import LogInOutContainer from '../LogInOutContainer'
import MapNavContainer from '../MapNavContainer'

import {navbar, logo} from './style'

const Navbar = () => (
  <header className={navbar}>
    <Logo className={logo} />
    <MapNavContainer />
    <LogInOutContainer />
  </header>
)

export default Navbar
