import React, { Component } from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui'

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

class SignUp extends Component {
    render() {
        return (
            <div style={formStyle.container} >
                <TextField style={formStyle.field} floatingLabelText='Username' fullWidth type='text'/>
                <TextField style={formStyle.field} floatingLabelText='Email' fullWidth type='email'/>
                <TextField style={formStyle.field} floatingLabelText='Password' fullWidth type='password'/>
                <TextField style={formStyle.field} floatingLabelText='Confirm Password' fullWidth type='password'/>
                <br/>
                <br/>
                <RaisedButton style={{...formStyle.field, alignContent: 'flex-end' }} primary label='Submit'/>
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

export default SignUp;