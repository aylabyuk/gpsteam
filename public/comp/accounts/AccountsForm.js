import React, { Component } from 'react';
import { Paper } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import SwipeableViews from 'react-swipeable-views'
import { Redirect  } from 'react-router-dom'

//apollo
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';

import Login from './Login'
import SignUp from './SignUp'
import { meQuery } from './requireAuth'
import { apolloClient } from '../../_primary'

import { selectedTheme  } from '../../MainComponent'
import styles from '../../css/bg.css'

const addNewUser = gql`
    mutation addNewUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        newUser: register(
            username: $username
            email: $email
            password: $password
        ) { id  }
    }
`;

const loginUser = gql`
    mutation loginUser(
        $email: String!
        $password: String!
    ) {
        login: login(
            email: $email
            password: $password
        ) { 
            token
            refreshToken
        }
    }
`;

class AccountsForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            slideIndex: 0,
            loggedIn: false
        };
    }

    setLocalStorageTokens = (token, refreshToken) => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
        } else {
            // Sorry! No Web Storage support..
        }
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    register = (username, email, password) => {
        this.props.newUser({ variables: {
            username: username,
            email: email,
            password: password,
        } }).then((data) => {
            console.log(data)
            this.login(email, password)
        }).catch((error) => {
            let msg = JSON.parse(JSON.stringify(error))
            console.log('there was an error sending the query: ', msg.graphQLErrors[0].message)
            window.alert(msg.graphQLErrors[0].message)
        });
    }

    login = (email, password) => {
        this.props.loginUser({ variables: {
            email: email,
            password: password,
        } }).then((d) => {
            console.log(d)
            this.setLocalStorageTokens(d.data.login.token, d.data.login.refreshToken)
            location.reload();

        }).catch((error) => {
            let msg = JSON.parse(JSON.stringify(error))
            console.log('there was an error sending the query: ', msg.graphQLErrors[0].message)
            window.alert(msg.graphQLErrors[0].message)
        });
    }  

    componentWillMount() {
        apolloClient.query({query: meQuery}).then((res) => {
            console.log(res)
            if(res.data.me) {
                console.info('already logged in as ' + res.data.me.username + ' redirecting to main page...')
                this.setState({ loggedIn: true })

            } else {
                this.setState({ loggedIn: false })
            }
        })
    }    
    
    render() {

        if(this.state.loggedIn) {
            return(<Redirect to='/' />)
        }

        return (
            <Paper className='mybg'  style={{ padding: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Paper zDepth={3} style={{ width: '500px' }}>
                    <center><MapsPlace className='logo' color={selectedTheme.appBar.color} style={{ width: '80px', height: '80px' }}/></center>
                    <div className='gpsbanner'>
                        GPS DASHBOARD
                    </div>
                    <SwipeableViews disabled  index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                        <Login handleChange={this.handleChange} login={this.login}/>
                        <SignUp handleChange={this.handleChange} register={this.register}/>
                    </SwipeableViews>
                </Paper>
            </Paper>
        );
      }
}

const ComponentWithMutation =  compose(
                graphql(addNewUser, { name: 'newUser' }),
                graphql(loginUser, { name: 'loginUser' })
            )(AccountsForm);

export default ComponentWithMutation