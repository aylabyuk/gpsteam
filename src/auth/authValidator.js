// validation for registration
export const validateRegistration = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    }
  
    if (!values.password) {
      errors.password = 'Required'
    }
  
    if (!values.password2) {
      errors.password2 = 'Required'
    }
  
    if(values.password !== values.password2) {
      errors.password2 = 'passwords not matched'
    }
    return errors
}
  
  // validation for login
export const validateLogin = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    }
  
    if (!values.password) {
      errors.password = 'Required'
    }
  
    return errors
}
  