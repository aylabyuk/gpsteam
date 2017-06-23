import { SELECTED_CONTACT, SELECTED_STAFFS, REMOVE_SELECTED_STAFF, RESET_CONTACT_ID, RESET_SELECTED_STAFFS, CLICKED_SITE, TOGGLE_LOGSHEET_SUBMITTING,
	TOGGLE_LOGSHEET_VIEWER_DRAWER, REVIEW_LOGSHEET } from '../actions/types'

const INITIAL_STATE = {selectedContact: null, selectedStaffs: [], clickedSite: null, hoveredSite: null, logsheetSubmitting: false, logsheetViewerDrawer: false, 
	logsheetToReview: null}

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
			return { ...state, selectedContactId: 0 }
		case RESET_SELECTED_STAFFS: 
			return { ...state, selectedStaffs: [] }
		case CLICKED_SITE: 
			return { ...state, clickedSite: action.payload }
		case TOGGLE_LOGSHEET_SUBMITTING: 
			return { ...state, logsheetSubmitting: !state.logsheetSubmitting }
		case TOGGLE_LOGSHEET_VIEWER_DRAWER: 
			return { ...state, logsheetViewerDrawer: !state.logsheetViewerDrawer }
		case REVIEW_LOGSHEET: 
			return { ...state, logsheetToReview: action.payload}
	}
	
	return state
}

export default ui