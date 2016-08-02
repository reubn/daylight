import React from 'react'
import {Link} from 'react-router'

import Logo from '../Logo'
import LogInOutContainer from '../LogInOutContainer'

import {navbar, logo} from './style'

const Navbar = () => (
  <header className={navbar}>
    <Link to="/login">
      <Logo className={logo} />
    </Link>
    <LogInOutContainer />
  </header>
)

export default Navbar
