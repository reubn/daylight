import loginAction from '../../store/actions/login'

function loginFormValidateAction(dispatch, form, submit){
  console.log(form, submit)
  const validations = {
    username(string){
      return {valid: !!string, error: 'username must not be empty'}
    },
    password(string){
      return {valid: !!string, error: 'password must not be empty'}
    }
  }

  const report = Object.keys(validations).reduce(({valid, errors}, key) => {
    const status = form[key] ? validations[key](form[key]) : {valid: false, error: `${key} must not be empty`}
    return {
      valid: valid && status.valid,
      errors: {
        ...errors,
        [key]: status
      }
    }
  }, {valid: true, errors: {}})
  dispatch({type: 'LOGINFORM_ERRORS', ...report})
  if(submit) return loginAction(dispatch, form)
}

export default loginFormValidateAction
