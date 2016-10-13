import React from 'react'

import Logo from '../Logo'
import LogInOutContainer from '../LogInOutContainer'

import {navbar, logo} from './style'

const Navbar = () => (
  <header className={navbar}>
    <Logo className={logo} />
    <LogInOutContainer />
  </header>
)

export default Navbar
