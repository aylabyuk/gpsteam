import React, {Component} from 'react'
import { Router, Route } from 'react-router'

//routes
import routes from './Routes'

// redux
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { applyMiddleware, createStore } from 'redux';

//apollo client
import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'


//subscription client
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

// Create regular NetworkInterface by using apollo-client's API: 
const networkInterface = createBatchingNetworkInterface({
  opts: {
    credentials: "same-origin",
  },
  batchInterval: 20,
  uri: "http://192.168.1.16:4000/graphql",
});

// connect to web-socket for subscription
const wsClient = new SubscriptionClient(`ws://192.168.1.16:4000/`, {
    reconnect: true,
    connectionParams: {
        // Pass any arguments for initialization 
    }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);


// create apollo client with subscription
export const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true,
  addTypename: false
});


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const history = syncHistoryWithStore(createBrowserHistory(), store);

const primary = () => (
  <ApolloProvider client={apolloClient} store={store} >
    <Router history={history} children={routes} />
  </ApolloProvider>
)

export default primary