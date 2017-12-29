import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validateRegistration } from '../authValidator'
import { renderTextField, tryLogin, loginQuery } from '../authUtil'
import { compose } from 'react-apollo'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from 'material-ui'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withMobileDialog from 'material-ui/Dialog/withMobileDialog';

class Register extends Component {

    handleRegistration(data) {
        const { register, login } = this.props

        register({
            variables: {
                username: data.username, 
                password: data.password
            }
        }).then((d) => {
            tryLogin(data, login)
        }).catch((msg) => {
            console.log(msg)
            window.alert(msg.graphQLErrors[0].message)
        })
    }

    render() {
        const { fullScreen, open, handleSubmit } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                fullScreen={fullScreen}
                aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Note: This will only create an account with a GUEST access level. To change your account's access level please 
                        inform the site's administrator or send an email to oriel.absin@gmail.com.
                    </DialogContentText>
                    <Field name='username' label='Username' placeholder='myusername123' component={renderTextField}/>
                    <Field name='password' label='Password' placeholder='********'  type='password' component={renderTextField}/>
                    <Field name='password2' label='Confirm Password' placeholder='********'  type='password' component={renderTextField}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(data => this.handleRegistration(data))} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const register = gql`
    mutation register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            id
        }
    }
`

const withForm = reduxForm({
    form: 'register',
    validate: validateRegistration,
    destroyOnUnmount: false
})(withMobileDialog()(Register))

const withData = compose(
    graphql(register, { name: 'register' }),
    graphql(loginQuery, { name: 'login' }),
)


export default (withData)(withForm)