import moment from 'moment'


// methods from this module are used to validate redux-form values or to normalize the format of certain fields such as 'years' and 'months'
// normalization example: http://redux-form.com/6.0.0-rc.1/examples/normalizing/
// validation example: http://redux-form.com/6.0.0-rc.1/examples/syncValidation/

// to normalize year values
// extract the full year from the date value 
export const years = () => {
    let arr = Array();
    let now = new Date().getFullYear();

    for(let i = 2000; i <= now; i++) arr.push(i.toString());

    return arr.reverse()
}

// to normalize months values
export const months = () => {
    return moment.months()
}

// validation of the fields fires when the user click submit or there is a blur event happened in the field component
// if the values for each field is blank an error will be issued to the component 
// which will be store in the object 'error'.
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
  // the next lines will check using regular expression if the emails provided are valid
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

// validation for the contactDetails 
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

export const validateFieldworkInfo = values => {
  const errors = {}
  if(!values.year) {
    errors.year = 'please provide a year'
  } else if(!years().includes(values.year)) {
    errors.year = 'this is not a valid year value'
  }

  if(!values.month) {
    errors.month = 'please provide a month'
  } else if(!months().includes(values.month)) {
    errors.month = 'this is not a valid month value'
  }

  if(!values.description) {
    errors.description = 'please provide fieldwork description'
  }

  return errors
}

export const validateLogsheet = values => {
  const errors = {}
  if (!values.logdate) {
    errors.logdate = 'Required'
  }
  if (!values.sitename) {
    errors.sitename = 'Required'
  }
  if (!values.location) {
    errors.location = 'Required'
  }
  if (!values.marker) {
    errors.marker = 'Required'
  }
  if (!values.receiverSN) {
    errors.receiverSN = 'Required'
  }
  if (!values.antennaSN) {
    errors.antennaSN = 'Required'
  }
  if (!values.north) {
    errors.north = 'Required'
  }
  if (!values.east) {
    errors.east = 'Required'
  }
  if (!values.south) {
    errors.south = 'Required'
  }
  if (!values.west) {
    errors.west = 'Required'
  }
  if (!values.startTime) {
    errors.startTime = 'Required'
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

export const numberAddress = value => {
  value = value
   .replace(/[^0-9.]/g, '') // Remove all chars except numbers and .

  return value
}

export const wholeNumber = value => {
  value = value
   .replace(/[^0-9]/g, '') // Remove all chars except numbers

  return value
}

export const normalizeUpperCase = (value) => {
  return value.toUpperCase()
}

