import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class AntennaHeightInfoFields extends Component {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Antenna Height Information</h5>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <TextField hintText='Observation Date' floatingLabelText='Observation Date' disabled={true} />
                    <TextField hintText='Session(Julian Day)' floatingLabelText='Session(Julian Day)' disabled={true} />
                    <Field name='rodNo' label="rod no." component={renderTextField} />
                    <Field name='rodCorrection' label="rod correction" component={renderTextField}  />
                    <TextField hintText='average slant antenna height' floatingLabelText='average slant antenna height' disabled={true} />
                    <Field name='ipAddress' label="IP address" component={renderTextField} />
                    <Field name='netmask' label="netmask" component={renderTextField}  />
                    <Field name='gateway' label="gateway" component={renderTextField} />
                    <Field name='dns' label="DNS" component={renderTextField}  />
                    <Field name='localTcpPort' label="local TCP port" component={renderTextField}  />
                    <Field name='lat' label="rough coordinate - latitude" component={renderTextField} />
                    <Field name='long' label="rough coordinate - longitude" component={renderTextField} />
                </div>
            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

export default form(AntennaHeightInfoFields);