import axios from 'axios'
import cookie from 'react-cookie'
import { CHART_DATA,
		 RESET_CHART_DATA,
		 SELECTED_TABLE_KEY,
		 SELECTED_CONTACT_KEY } from './types'

const API_URL = 'http://192.168.1.206:3000'
const CLIENT_ROOT_URL = 'http://localhost:8080'


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

//ui actions

export function setSelectedTableKey(key) {
	return function(dispatch) {
		dispatch({
			type: SELECTED_TABLE_KEY,
			payload: key
		})
	}
}

export function setSelectedContactKey(key) {
	return function(dispatch) {
		dispatch({
			type: SELECTED_CONTACT_KEY,
			payload: key
		})
	}
}