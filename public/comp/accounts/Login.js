import React, { Component } from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { renderTextField, formStyle } from './SignUp'
import { validateLogin as validate } from '../formValidators/formValidators'

class Login extends Component {

    handleSubmitValues = () => {
        let { email, password } = this.props.loginValues
        this.props.login(email, password)
    }

    render() {
        let { handleSubmit, handleChange } = this.props

        return (
            <div style={formStyle.container} >
                <div className='regttext'>Login</div>
                <Field component={renderTextField} name='email' floatingLabelText='Email' fullWidth type='email'/>
                <Field component={renderTextField} name='password' floatingLabelText='Password' fullWidth type='password'/>
                <br/>
                <br/>
                <RaisedButton style={{...formStyle.field, alignContent: 'flex-end' }} primary label='Submit' onTouchTap={handleSubmit(this.handleSubmitValues.bind(this))}/>
                <div style={formStyle.field}>
                    <h5 style={{ textAlign: 'right' }}>
                        No account yet?
                        <span style={formStyle.clickable} onClick={()=> handleChange(1)}> Create one </span>
                    </h5>
                </div>
            </div>
        );
    }
}

const form =  reduxForm({  
    form: 'login',
    validate
});

const selector = formValueSelector('login') 
Login = connect(
  state => ({
    loginValues: selector(state, 'email', 'password')
  })
)(Login)

export default form(Login);