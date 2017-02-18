import { RECEIVER_INFO, 
	ANTENNA_INFO, 
	SELECTED_CONTACT, 
	CLEAR_ANTENNA_INFO, 
	CLEAR_RECEIVER_INFO } from '../actions/types'

const INITIAL_STATE = 
	{
		receiverInfo: {
			receiver_type: '',
			part_number: ''
		}, 
		antennaInfo: {
			antenna_type: '',
			antenna_partnumber: ''
		}, 
		selectedContact: []
 	}

function serverData(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case RECEIVER_INFO:
		return { ...state, receiverInfo: action.payload }
	case ANTENNA_INFO:
		return { ...state, antennaInfo: action.payload }
	case SELECTED_CONTACT:
		return { ...state, selectedContact: action.payload }
	case CLEAR_RECEIVER_INFO:
		return { ...state,
			receiverInfo: {
				receiver_type: '',
				part_number: ''
			} 
		}
	case CLEAR_ANTENNA_INFO:
		return { ...state,
			antennaInfo: {
				antenna_type: '',
				antenna_partnumber: ''
			} 
		}
	}
	return state
}

export default serverData