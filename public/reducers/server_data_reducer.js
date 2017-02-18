import { RECEIVER_INFO, ANTENNA_INFO, SELECTED_CONTACT } from '../actions/types'

const INITIAL_STATE = {receiverInfo: 0, antennaInfo: 0, selectedContact: []}

function serverData(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case RECEIVER_INFO:
		return { ...state, receiverInfo: action.payload }
	case ANTENNA_INFO:
		return { ...state, antennaInfo: action.payload }
	case SELECTED_CONTACT:
		return { ...state, selectedContact: action.payload }
	}
	return state
}

export default serverData