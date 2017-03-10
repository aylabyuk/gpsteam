import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import plot from './plot_reducer'
import ui from './ui_reducer'

const rootReducer = combineReducers({
	plot: plot,
	form: formReducer,
	ui: ui,
	routing: routerReducer
	})

export default rootReducer