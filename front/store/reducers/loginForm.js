import initialState from '../initials/loginForm'

const loginFormReducer = (state=initialState, action) => {
  if(action.type === 'LOGINFORM_ERRORS') return {...state, errors: action.hasOwnProperty('errors') ? action.errors : state.errors, valid: action.hasOwnProperty('valid') ? action.valid : false}

  if(action.type === 'LOGINFORM_LOADING') return {...state, loading: action.hasOwnProperty('status') ? action.status : true}

  if(action.type === 'LOGINFORM_REDIRECT') return {...state, redirect: action.hasOwnProperty('url') ? action.url : null}

  return state
}

export default loginFormReducer
