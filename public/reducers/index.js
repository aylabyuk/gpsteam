import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import ui from './ui_reducer'

const rootReducer = combineReducers({
	form: formReducer,
	ui: ui
	})

export default rootReducer