import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ui from './ui_reducer'

const rootReducer = combineReducers({
	form: formReducer,
	ui: ui,
	routing: routerReducer
	})

export default rootReducer