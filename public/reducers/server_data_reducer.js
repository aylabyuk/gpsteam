import { RECEIVER_INFO, 
	ANTENNA_INFO, 
	SELECTED_TABLE_KEY, 
	CLEAR_ANTENNA_INFO, 
	CLEAR_RECEIVER_INFO } from '../actions/types'

<<<<<<< HEAD
const INITIAL_STATE = {
	receiverInfo: { 
		receiver_type: '', 
		part_number: '' 
	}, 
	antennaInfo: { 
		antenna_type: '',
		antenna_partnumber: '' 
	}, 
	selectedContact: []}
=======
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
		selectedKey: []
 	}
>>>>>>> 9d0fd4bcded4b750a99f7e6227d500e07c8b3997

function serverData(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case RECEIVER_INFO:
		return { ...state, receiverInfo: action.payload }
	case ANTENNA_INFO:
		return { ...state, antennaInfo: action.payload }
	case SELECTED_TABLE_KEY:
		return { ...state, selectedKey: action.payload }
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