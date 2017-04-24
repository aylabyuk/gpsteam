import { SELECTED_CONTACT_ID, SELECTED_STAFFS } from '../actions/types'

const INITIAL_STATE = {selectedContactId: 0, selectedStaffs: []}

function ui(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case SELECTED_CONTACT_ID:
		return { ...state, selectedContactId: action.payload }
	case SELECTED_STAFFS:
		return { ...state, selectedStaffs: action.payload }
	}
	return state
}

export default ui