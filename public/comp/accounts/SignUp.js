import React, { Component } from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { validateRegistration as validate } from '../formValidators/formValidators'

const formStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    field: {
        width: '350px'
    },
    clickable: {
        cursor: 'pointer',
        color: 'rgb(255, 64, 129)'
    }
}

const renderTextField = ({ input, label, fullWidth, meta: { touched, error }, ...custom }) => (
    <TextField 
      style={formStyle.field}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      fullWidth={true}
    />
  )

class SignUp extends Component {
    render() {
        return (
            <div style={formStyle.container} >
                <div className='regttext'>Register</div>
                <Field component={renderTextField}  name='username'  floatingLabelText='Username' type='text'/>
                <Field component={renderTextField}  name='email'  floatingLabelText='Email' type='email'/>
                <Field component={renderTextField}  name='password'  floatingLabelText='Password' type='password'/>
                <Field component={renderTextField}  name='confirmpassword'  floatingLabelText='Confirm Password' type='password'/>
                <br/>
                <br/>
                <RaisedButton style={{...formStyle.field, alignContent: 'flex-end' }} primary label='Submit' />
                <div style={formStyle.field}>
                    <h5 style={{ textAlign: 'right' }}>
                        Already registered?
                        <span style={formStyle.clickable} onClick={()=> this.props.handleChange(0)}> Login </span>
                    </h5>
                </div>
            </div>
        );
    }
}

const form =  reduxForm({  
    form: 'registration',
    validate
});

export default form(SignUp);