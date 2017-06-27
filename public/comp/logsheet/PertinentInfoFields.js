import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import SiteContactPersonFields from './SiteContactPersonFields'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, multiLine, disabled, fullWidth, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={fullWidth}
    multiLine={multiLine}
    rowsMax={3}
    disabled={disabled}
  />
)

class PertinentInfoFields extends PureComponent {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Other Pertinent Information</h5>
                <Field disabled={this.props.ro} multiLine={true} fullWidth={true} name='unusualAbnormalObservation' label="unusual/abnormal situation observed(on weather, instrument, battery, marker, site)" component={renderTextField} />
                <Field disabled={this.props.ro} multiLine={true} fullWidth={true} name='lodgingOrRoadInfo' label="lodging or road information" component={renderTextField} />
                <Field disabled={this.props.ro} multiLine={true} fullWidth={true} name='pertinentInfo' label="other pertinent information" component={renderTextField} />
            </div>
        );
    }
}

export default PertinentInfoFields;