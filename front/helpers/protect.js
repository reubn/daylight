/* eslint no-param-reassign: 0 */

const protect = ({dispatch, getState}, isNotAuthPath=null, isAuthPath=null) =>
  (nextState, replace) => {
    const isAuth = getState().user.loggedIn
    const isNotAuthFunc = isNotAuthPath ? () => {
      dispatch({type: 'LOGINFORM_REDIRECT', url: nextState.location.pathname})
      replace({pathname: isNotAuthPath})
    } : () => null
    const isAuthFunc = isAuthPath ? () => replace({pathname: isAuthPath}) : () => null

    if(isAuth) isAuthFunc()
    else isNotAuthFunc()
  }

export default protect
