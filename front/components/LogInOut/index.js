import React from 'react'

import {login as loginStyle, logout as logoutStyle, punc} from './style'

const LogInOut = ({signedIn, login, logout}) => (
  <span className={signedIn ? logoutStyle : loginStyle} onClick={signedIn ? logout : login}>
    {signedIn ? 'Logout' : 'Login'}
    <span className={punc}>{signedIn ? '?' : '!'}</span>
  </span>
  )

export default LogInOut
