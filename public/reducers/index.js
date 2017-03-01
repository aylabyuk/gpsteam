import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import plot from './plot_reducer'

import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' }),
//   reduxRootSelector: state => state.apollo,
  connectToDevTools: true,
  addTypename: false
});


const rootReducer = combineReducers({
	plot: plot,
	form: formReducer,
	routing: routerReducer
	})

export default rootReducer