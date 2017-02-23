import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth_reducer'
import plot from './plot_reducer'
import serverData from './server_data_reducer'
import uiState from './ui_reducer'

import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' }),
  reduxRootSelector: state => state.apollo,
  connectToDevTools: true
});


const rootReducer = combineReducers({
	auth: auth ,
	plot: plot,
	form: formReducer,
	serverData: serverData,
	uiState: uiState,
	routing: routerReducer,
	apollo: client.reducer()
	})

export default rootReducer