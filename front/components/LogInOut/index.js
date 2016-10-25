import React from 'react'

import {login as loginStyle, logout as logoutStyle, punc} from './style'

const LogInOut = ({loggedIn, login, logout}) => (
  <span className={loggedIn ? logoutStyle : loginStyle} onClick={loggedIn ? logout : login}>
    {loggedIn ? 'Logout' : 'Login'}
    <span className={punc}>{loggedIn ? '?' : '!'}</span>
  </span>
  )

export default LogInOut
