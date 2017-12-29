import React from 'react';  
import { Redirect } from 'react-router-dom'

//graphql
import gql from 'graphql-tag';
import { client } from '../index'

// query for the logged in user
export let meQuery = gql`query {
    me {
        id 
        username
        access_level_id
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
        client.query({query: meQuery}).then((res) => {
            console.log(res)
            if(!res.data.me || !res.data.me.id) {
                // console.debug('not logged in. redirecting to login page...')
                this.setState({ redirectToLogin: true })
            } else {
                // console.debug('logged in as ' + res.data.me.username  + '. redirecting...')
                this.setState({ isAuthenticated: true, me: res.data.me })
            }
        })
    }

    render() {
        if(this.state.redirectToLogin) {
            return(<Redirect to='/auth' />)
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