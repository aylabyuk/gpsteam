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
    multiLine={true}
    fullWidth={true}
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