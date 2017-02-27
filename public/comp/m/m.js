import axios from 'axios'

const API_URL = 'http://192.168.1.206:3000'
//todo field validations


//fetching of data from server

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