import React from 'react';  
import { Redirect } from 'react-router-dom'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { apolloClient  } from '../../_primary'

// query for the logged in user
export let meQuery = gql`query {
    me {
        id 
        username
        email
        isAdmin
        isStaff
    }
}`;

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            redirectToLogin: false,
            me: null
        };
    }

    componentWillMount() {
        this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth()
    }

    checkAuth() {
        // check if authenticated
        // if not redirect to Login page
        apolloClient.query({query: meQuery}).then((res) => {
            console.log(res)
            if(!res.data.me) {
                console.info('not logged in. redirecting to login page...')
                this.setState({ redirectToLogin: true })
            } else {
                console.info('logged in as ' + res.data.me.username  + '. redirecting...')
                this.setState({ isAuthenticated: true, me: res.data.me })
            }
        })
    }

    render() {
        if(this.state.redirectToLogin) {
            return(<Redirect to='/login' />)
        }

        return (
            <div>
            {this.state.isAuthenticated === true
                ? <Component {...this.props} me={this.state.me} />
                : null
            }
            </div>
        )

    }
  }

  return AuthenticatedComponent
}