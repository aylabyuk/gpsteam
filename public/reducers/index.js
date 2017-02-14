import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth_reducer'
import plot from './plot_reducer'
import serverData from './serverData_reducer'

const rootReducer = combineReducers({
	auth: auth ,
	plot: plot,
	form: formReducer,
	serverData: serverData,
	routing: routerReducer
	})

export default rootReducer