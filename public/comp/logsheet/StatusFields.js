import React, { PureComponent } from 'react';
import { Field } from 'redux-form'

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

class StatusFields extends PureComponent {
    render() {
        return (
            <div>
                <Field name="receiverStatus"  component={renderTextField} label='receiver status' />
                <Field name="antennaStatus"  component={renderTextField} label='antenna status' />
            </div>
        );
    }
}

export default StatusFields;