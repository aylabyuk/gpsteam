import axios from 'axios'
import cookie from 'react-cookie'
import { SELECTED_CONTACT_ID, SELECTED_STAFFS } from './types'

const API_URL = 'http://192.168.1.206:3000'
const CLIENT_ROOT_URL = 'http://localhost:8080'


export function changeSelectedContactId(id) {
	return function(dispatch) {
		dispatch({
			type: SELECTED_CONTACT_ID,
			payload: id
		})
	}
}

export function changeSelectedStaffs(arr) {
	return function(dispatch) {
		dispatch({
			type: SELECTED_STAFFS,
			payload: arr
		})
	}
}