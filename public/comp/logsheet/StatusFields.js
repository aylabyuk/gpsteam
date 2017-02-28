import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    multiLine={true}
    fullWidth={true}
    rowsMax={3}
  />
)

class StatusFields extends Component {
    render() {
        return (
            <div>
                <Field name="receiverStatus"  component={renderTextField} label='receiver status' />
                <Field name="antennaStatus"  component={renderTextField} label='antenna status' />
            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})


export default form(StatusFields);