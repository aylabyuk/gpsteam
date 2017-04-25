import { SELECTED_CONTACT_ID, SELECTED_STAFFS, REMOVE_SELECTED_STAFF } from '../actions/types'

const INITIAL_STATE = {selectedContactId: 0, selectedStaffs: []}

function ui(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case SELECTED_CONTACT_ID:
		return { ...state, selectedContactId: action.payload }
	case SELECTED_STAFFS:
		return { ...state, selectedStaffs: action.payload }
	case REMOVE_SELECTED_STAFF:
		let index = state.selectedStaffs.findIndex(x => x.id==action.payload)
		return {  selectedStaffs: [...state.selectedStaffs.slice(0, index), ...state.selectedStaffs.slice(index + 1)] }
	}
	return state
}

export default ui