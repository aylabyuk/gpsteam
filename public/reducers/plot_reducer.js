import { CHART_DATA, RESET_CHART_DATA } from '../actions/types'

const INITIAL_STATE = {computed: 0}

function plot(state = INITIAL_STATE, action) {  
	switch(action.type) {
	case CHART_DATA:
		return { ...state, computed: action.payload }
    case RESET_CHART_DATA:
		return { ...state, computed: 0 }
	} 
	return state
}

export default plot