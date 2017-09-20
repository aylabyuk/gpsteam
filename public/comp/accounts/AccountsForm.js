import React, { Component } from 'react';
import { Paper, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'

//apollo
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';

import Login from './Login'
import SignUp from './SignUp'

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
        ) { id }
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
            refreshtoken
        }
    }
`;

class AccountsForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            slideIndex: 0,
        };
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
        }).catch((error) => {
            console.log('there was an error sending the query: ', error);
        });
    }

    login = (email, password) => {
        this.props.loginUser({ variables: {
            email: email,
            password: password,
        } }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log('there was an error sending the query: ', error);
        });
    }

    render() {
        return (
            <Paper className='mybg'  style={{ padding: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Paper zDepth={3} style={{ width: '500px' }}>
                    {/* <Tabs onChange={this.handleChange} value={this.state.slideIndex} >
                        <Tab label="Login" value={0} />
                        <Tab label="SignUp" value={1} />
                    </Tabs> */}
                    <div className='gpsbanner'>
                        GPS dashboard
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