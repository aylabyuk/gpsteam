import { RECEIVER_INFO } from '../actions/types'

const INITIAL_STATE = {receiverInfo: 0}

function serverData(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case RECEIVER_INFO:
		return { ...state, receiverInfo: action.payload }
	}
	return state
}

export default serverData