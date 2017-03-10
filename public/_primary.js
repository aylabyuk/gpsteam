/* eslint-disable */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'
import App from './App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//React Components
import NotFoundPage from './comp/NotFoundPage'
import _LogSheet from './comp/logsheet/_LogSheet'

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
  uri: "http://gpsteamapi.herokuapp.com/graphql",
});


// connect to web-socket for subscription
const wsClient = new SubscriptionClient(`ws://localhost:4000/`, {
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


const history = syncHistoryWithStore(browserHistory, store);

//hot reload for reducer
if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

render(
    <ApolloProvider client={apolloClient} store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={_LogSheet} />
                <Route path="/logsheet" component={_LogSheet} />

                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    </ApolloProvider >,
    document.getElementById("app")
)