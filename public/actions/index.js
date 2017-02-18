import axios from 'axios'
import cookie from 'react-cookie'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST,
		 CHART_DATA,
		 RESET_CHART_DATA,
		 RECEIVER_INFO,
		 ANTENNA_INFO,
		 CLEAR_ANTENNA_INFO,
		 CLEAR_RECEIVER_INFO,
		 SELECTED_CONTACT } from './types'

const API_URL = 'http://localhost:3000'
const CLIENT_ROOT_URL = 'http://localhost:8080'

export function errorHandler(dispatch, error, type) {
	let errorMessage = ''

	if(error.data.error) {
		errorMessage = error.data.error
	} else if (error.data) {
		errorMessage = error.data
	} else {
		errorMessage = error
	}

	if(error.status === 401) {
		dispatch({
			type: type,
			payload: 'You are not authorized to do this. Please login and try again.'
		})
		logoutUser()
	} else {
		dispatch({
			type: type,
			payload: errorMessage
		})
	}
}

export function loginUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/auth/login`, { email, password }).then(response => {
			cookie.save('token', response.data.token, { path: '/' })
			dispatch({ type: AUTH_USER })
			window.location.href = CLIENT_ROOT_URL + '/dashboard'
		}).catch((error) => {
			errorHandler(dispatch, error.response, AUTH_ERROR)
		})
	}
}

export function registerUser({ email, name, username, password }) {  
	return function(dispatch) {
		axios.post(`${API_URL}/auth/register`, { email, name, username, password }).then(response => {
			cookie.save('token', response.data.token, { path: '/' })
			dispatch({ type: AUTH_USER })
			window.location.href = CLIENT_ROOT_URL + '/dashboard'
		}).catch((error) => {
			errorHandler(dispatch, error.response, AUTH_ERROR)
		})
	}
}

export function logoutUser() {  
	return function (dispatch) {
		dispatch({ type: UNAUTH_USER })
		cookie.remove('token', { path: '/' })

		window.location.href = CLIENT_ROOT_URL + '/login'
	}
}

export function protectedTest() {  
	return function(dispatch) {
		axios.get(`${API_URL}/protected`, {
			headers: { 'Authorization': cookie.load('token') }
		}).then(response => {
			dispatch({
				type: PROTECTED_TEST,
				payload: response.data.content
			})
		}).catch((error) => {
			errorHandler(dispatch, error.response, AUTH_ERROR)
		})
	}
}

///CHART ACTIONS
export function chartData(data) {
	return function(dispatch) {
		axios.get(`${API_URL}/compute` , {
			params: {
				data: data
			}
		})
		.then(function (response) {
			dispatch({
				type: CHART_DATA,
				payload: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export function resetChartData() {
	return function(dispatch) {
		dispatch({
			type: RESET_CHART_DATA,
		})
	}
}


//server data actions
export function getReceiverInfo(serial) {
	return function(dispatch) {
		let info
		axios.get(`${API_URL}/gettingreceiverinfo`, {
			params: {
				id: serial
			}
		})
		.then(function (response) {
			dispatch({
				type: RECEIVER_INFO,
				payload: response.data[0][0]
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export function getAntennaInfo(serial) {
	return function(dispatch) {
		let info
		axios.get(`${API_URL}/gettingantennainfo`, {
			params: {
				id: serial
			}
		})
		.then(function (response) {
			//console.log(response.data[0][0])
			dispatch({
				type: ANTENNA_INFO,
				payload: response.data[0][0]
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export function clearReceiverInfo() {
	return function(dispatch) {
		dispatch({
			type: CLEAR_RECEIVER_INFO
		})
	}
}

export function clearAntennaInfo() {
	return function(dispatch) {
		dispatch({
			type: CLEAR_ANTENNA_INFO
		})
	}
}

export function setSelectedContactKey(key) {
	return function(dispatch) {
		dispatch({
			type: SELECTED_CONTACT,
			payload: key
		})
	}
}