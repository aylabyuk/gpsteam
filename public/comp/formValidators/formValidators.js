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
  if (!values.email1) {
    errors.email1 = ''
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
    errors.email1 = 'This is not a valid email address'
  }
  if (!values.email2) {
    errors.email2 = ''
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email2)) {
    errors.email2 = 'This is not a valid email address'
  }
  if (!values.email3) {
    errors.email3 = ''
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email3)) {
    errors.email3 = 'This is not a valid email address'
  }
  return errors
}

export const normalizePhone = (value) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export const onlyDecimal = value => {
  value = value
    .replace(/[^0-9.]/g, '') // Remove all chars except numbers and .

  // Create an array with sections split by .
  const sections = value.split('.')

  // Remove any leading 0s apart from single 0
  if (sections[0] !== '0' && sections[0] !== '00') {
    sections[0] = sections[0].replace(/^0+/, '')
  } else {
    sections[0] = '0'
  }

  // If numbers exist after first .
  if (sections[1]) {
    // Join first two sections and truncate end section to length 2
    return sections[0] + '.' + sections[1]
  // If original value had a decimal place at the end, add it back
  } else if (value.indexOf('.') !== -1) {
    return sections[0] + '.'
  // Otherwise, return only section
  } else {
    return sections[0]
  }
}


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