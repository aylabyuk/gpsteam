import React, { PureComponent } from 'react';
import { Field } from 'redux-form'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, disabled, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    multiLine={true}
    fullWidth={true}
    rowsMax={3}
    disabled={disabled}
  />
)

// This component contains two fields receiverStatus and antennaStatus
class StatusFields extends PureComponent {
    render() {
        return (
            <div>
                <Field name="receiverStatus" disabled={this.props.ro} component={renderTextField} label='receiver status' />
                <Field name="antennaStatus" disabled={this.props.ro} component={renderTextField} label='antenna status' />
            </div>
        );
    }
}

export default StatusFields;