export const validateStaffInfo = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.nickName) {
    errors.nickName = 'Required'
  }
  if (!values.contactNum) {
    errors.contactNum = 'Required'
  }
  if (!values.birthday) {
    errors.birthday = 'Required'
  }
  if (!values.positionName) {
    errors.positionName = 'Required'
  }
  if (!values.divisionName) {
    errors.divisionName = 'Required'
  }
  if (!values.officeLocation) {
    errors.officeLocation = 'Required'
  }
  // if (!values.email) {
  //   errors.email = ''
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'This is not a valid email address'
  // }
  return errors
}