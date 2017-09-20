import React, {Component} from 'react'
import Perf from 'react-addons-perf'
import { Router, Route } from 'react-router'

// redux
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { applyMiddleware, createStore } from 'redux';

//apollo client
import ApolloClient from 'apollo-client'
import { createBatchingNetworkInterface } from 'apollo-upload-client'
import { ApolloProvider } from 'react-apollo'


//subscription client
import {SubscriptionClient } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions'

import App from './App'

export let PORT
export let ip

// Perf is used for performance checking addon
// https://facebook.github.io/react/docs/perf.html
window.Perf = Perf

// if project is in dev mode or the port is 8080 point "ip" to localhost:4040
// else point to the hosts ip address with port 4000 so it will become accessible from other computer
if(window.location.port == '8080'){
  PORT=4040
  ip="localhost:"
} else {
  PORT=4000
  ip="192.168.50.101:"
}

// Create regular NetworkInterface by using apollo-client's API: 
// Apollo's network layer can be configured on how queries will be sent over http
const networkInterface = createBatchingNetworkInterface({
  opts: {
    credentials: "include",
  },
  batchInterval: 20,
  uri: "http://" + ip + PORT + "/graphql",
});

// implement token in header requests for authorization/authentication
networkInterface.use([{
  applyBatchMiddleware(req, next) {
    if(!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    req.options.headers['x-token'] = token ? token : 'not defined'
    req.options.headers['x-refresh-token'] = refreshToken ? refreshToken : 'not defined'
    next();
  }
}]);

// connect to web-socket for subscription
const wsClient = new SubscriptionClient("ws://" + ip + PORT + "/", {
    reconnect: true,
    connectionParams: {
        // Pass any arguments for initialization 
    }
});

// NetworkInterface combined with wsClient for subscription
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

// create a centralize redux store. Global application states will be kept here.
// Add devtools so that redux related stuff will become accessible in the browser
// reduxThunk: https://github.com/gaearon/redux-thunk
// redux-devtools: https://github.com/gaearon/redux-devtools
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// App is a child of ApolloProvider 
// ApolloProvider is a higher order component that will provide data to all parts of the application
class primary extends Component {
  render() {
    return (
     <ApolloProvider client={apolloClient} store={store} >
      <App routes={this.props.routes()}/>
    </ApolloProvider>
    );
  }
}

export default primary;