import axios from 'axios'

const API_URL = 'http://192.168.1.206:3000'
//field validations

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

//fetching of data from server
export function fetchSites() {  
	let siteNames = []
	axios.get(`${API_URL}/sitename`)
	.then(function (response) {
		response.data.map((d) => {
			siteNames.push(d.site_name)
		})
	})
	.catch(function (error) {
		return error
		console.log(error);
	});
	return siteNames
}

export function fetchReceivers() {  
	let receiverSNs = []
	axios.get(`${API_URL}/allreceiversn`)
	.then(function (response) {
		response.data.map((d) => {
			receiverSNs.push(d.serial_number)
		})
	})
	.catch(function (error) {
		return error
		console.log(error);
	});
	return receiverSNs
}

export function fetchAntennas() {  
	let antennaSNs = []
	axios.get(`${API_URL}/allantennasn`)
	.then(function (response) {
		response.data.map((d) => {
			antennaSNs.push(d.antenna_serialnumber)
		})
	})
	.catch(function (error) {
		return error
		console.log(error);
	});
	return antennaSNs
}

export function fetchSiteContacts() {  
	let contactpersons = []
	axios.get(`${API_URL}/allcontactperson`)
	.then(function (response) {
		response.data.map((d) => {
			contactpersons.push(d)
		})
	})
	.catch(function (error) {
		return error
		console.log(error);
	});
	return contactpersons
}