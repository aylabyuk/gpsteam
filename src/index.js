import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Routes } from './app/routes'

import 'typeface-roboto'

import './index.css'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'x-token': token ? token : null,
        'x-refresh-token': refreshToken ? refreshToken : null
      }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const Provider = () => {
    return(
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    )
}

ReactDOM.render(<Provider />, document.getElementById('root'));
registerServiceWorker();
