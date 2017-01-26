import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth_reducer'

const rootReducer = combineReducers({
	auth: auth ,
	form: formReducer,
	routing: routerReducer})

export default rootReducer