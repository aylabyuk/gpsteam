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
  // if (!values.email1) {
  //   errors.email1 = ''
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
  //   errors.email1 = 'This is not a valid email address'
  // }
  // if (!values.email2) {
  //   errors.email1 = ''
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
  //   errors.email1 = 'This is not a valid email address'
  // }
  // if (!values.email3) {
  //   errors.email1 = ''
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
  //   errors.email1 = 'This is not a valid email address'
  // }
  return errors
}