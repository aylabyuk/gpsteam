export const validateContactDetails = values => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }
  if (!values.contact_number) {
    errors.contact_number = 'Required'
  }
  if (!values.email_add) {
    errors.email_add = ''
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_add)) {
    errors.email_add = 'This is not a valid email address'
  }
  return errors
}