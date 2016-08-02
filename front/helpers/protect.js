/* eslint no-param-reassign: 0 */

const protect = ({getState}, isNotAuthPath=null, isAuthPath=null) =>
  (nextState, replace) => {
    const isAuth = !!getState().daylight.user.id
    const isNotAuthFunc = isNotAuthPath ? () => replace({pathname: isNotAuthPath, state: {nextPathname: nextState.location.pathname}}) : () => null
    const isAuthFunc = isAuthPath ? () => replace({pathname: isAuthPath, state: {nextPathname: nextState.location.pathname}}) : () => null

    if(isAuth) isAuthFunc()
    else isNotAuthFunc()
  }

export default protect
