import { SITE_NAME_DATA } from '../actions/types'

const INITIAL_STATE = {sites: ['fetching site names..']}

function serverData(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case SITE_NAME_DATA:
		return { ...state, sites: action.payload }
	} 
	return state
}

export default serverData