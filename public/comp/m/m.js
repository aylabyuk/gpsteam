var validatejs = require('validate.js')

var constraints = {
	email: { 
		presence: true,
		email: { 
			message: 'not valid'
		}
	},
	name: {
		presence: true
	},
	username: {
		presence: true,
		length: {
			maximum: 20,
			minimum: 6
		}
	},
	password: {
		presence: true,
		length: {
			maximum: 20,
			minimum: 6
		}
	}
}

export function validate(formProps) {  

	const errors = validatejs(formProps, constraints)

	return errors
}