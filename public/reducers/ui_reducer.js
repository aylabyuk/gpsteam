import { SELECTED_CONTACT, SELECTED_STAFFS, REMOVE_SELECTED_STAFF, RESET_CONTACT_ID, RESET_SELECTED_STAFFS, CLICKED_SITE, TOGGLE_LOGSHEET_SUBMITTING,
	TOGGLE_SEARCH_LOGSHEET, REVIEW_LOGSHEET, LOGSHEET_MODE, SITE_DETAILS_DRAWER, TOGGLE_SIDENAV } from '../actions/types'

const INITIAL_STATE = {selectedContact: null, selectedStaffs: [], clickedSite: null, hoveredSite: null, logsheetSubmitting: false, logsheetSearch: false, 
	logsheetToReview: null, logsheetMode: 'new', sidenav: false}

function ui(state = INITIAL_STATE, action) {  
	switch(action.type) {
		case SELECTED_CONTACT:
			return { ...state, selectedContact: action.payload }
		case SELECTED_STAFFS:
			return { ...state, selectedStaffs: action.payload }
		case REMOVE_SELECTED_STAFF:
			let index = state.selectedStaffs.findIndex(x => x.id==action.payload)
			return {  selectedStaffs: [...state.selectedStaffs.slice(0, index), ...state.selectedStaffs.slice(index + 1)] }
		case RESET_CONTACT_ID: 
			return { ...state, selectedContact: null }
		case RESET_SELECTED_STAFFS: 
			return { ...state, selectedStaffs: [] }
		case CLICKED_SITE: 
			return { ...state, clickedSite: action.payload }
		case TOGGLE_LOGSHEET_SUBMITTING: 
			return { ...state, logsheetSubmitting: !state.logsheetSubmitting }
		case TOGGLE_SEARCH_LOGSHEET: 
			return { ...state, logsheetSearch: !state.logsheetSearch }
		case REVIEW_LOGSHEET: 
			return { ...state, logsheetToReview: action.payload}
		case LOGSHEET_MODE: 
			return { ...state, logsheetMode: action.payload}
		case TOGGLE_SIDENAV: 
			return { ...state, sidenav: !state.sidenav }
	}
	
	return state
}

export default ui