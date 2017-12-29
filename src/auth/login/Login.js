import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { graphql } from 'react-apollo';
import { renderTextField, tryLogin, loginQuery } from '../authUtil'

import { validateLogin } from '../authValidator'

import {
    Typography,
    Button,
    Grid,
    withStyles 
} from 'material-ui'

    const styles = theme => ({
        root: {
            flexGrow: 1,
            padding: 25,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        field: {
            padding: 16,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        button: {
            marginTop: 20,
            width: '100%'
        },
        text: {
            paddingTop: 50
        },
        link: {
            color: '#2980b9',
            cursor: 'pointer'
        }
    })

class Login extends Component  {

    render() {
        const { registerFirst, classes, handleSubmit, login } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center' alignContent='flex-end'>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <Field name='username' label='Username' placeholder='myusername123' component={renderTextField}/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <Field name='password' label='Password' placeholder='********'  type='password' component={renderTextField}/>
                    </Grid>
                    <Grid item xs={12} sm={2} md={1} lg={1}>
                        <Button raised className={classes.button} color='primary' onClick={handleSubmit(data => tryLogin(data, login)) }>login</Button>
                    </Grid>
                </Grid>
                <Typography className={classes.text} type='subheading'>not yet registered? <a className={classes.link} onClick={registerFirst}>Click here.</a></Typography>
            </div>
        )
    }
}

const withForm = reduxForm({
    form: 'login',
    validate: validateLogin
})(withStyles(styles)(Login))

export default graphql(loginQuery, { name: 'login' })(withForm)