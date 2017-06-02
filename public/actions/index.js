import { SELECTED_CONTACT_ID, SELECTED_STAFFS, REMOVE_SELECTED_STAFF, RESET_CONTACT_ID, RESET_SELECTED_STAFFS, CLICKED_SITE } from './types'

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

export function removeSelectedStaff(id) {
	return function(dispatch) {
		dispatch({
			type: REMOVE_SELECTED_STAFF,
			payload: id
		})
	}
}

export function resetSelectedStaffs() {
	return function(dispatch) {
		dispatch({
			type: RESET_SELECTED_STAFFS
		})
	}
}

export function resetContactId() {
	return function(dispatch) {
		dispatch({
			type: RESET_CONTACT_ID
		})
	}
}

export function changeClickedSite(name) {
	return function(dispatch) {
		dispatch({
			type: CLICKED_SITE,
			payload: name
		})
	}
}