import { SELECTED_CONTACT_ID } from '../actions/types'

const INITIAL_STATE = {selectedContactId: 0}

function ui(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case SELECTED_CONTACT_ID:
		return { ...state, selectedContactId: action.payload }
	} 
	return state
}

export default ui