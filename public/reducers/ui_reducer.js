import { SELECTED_TABLE_KEY, SELECTED_CONTACT_KEY } from '../actions/types'

const INITIAL_STATE = 
	{
		selectedKey: [],
        logsheet: {
            selectedContactKey: 'notset'
        }
 	}

function uiState(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case SELECTED_TABLE_KEY:
		return { ...state, selectedKey: action.payload }
    case SELECTED_CONTACT_KEY:
        return { ...state, logsheet: {selectedContactKey: action.payload} }
    }
    return state
}

export default uiState