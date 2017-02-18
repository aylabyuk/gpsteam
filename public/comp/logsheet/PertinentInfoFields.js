import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import SiteContactPersonFields from './SiteContactPersonFields'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, multiLine, fullWidth, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={fullWidth}
    multiLine={multiLine}
    rowsMax={3}
  />
)

class PertinentInfoFields extends Component {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Other Pertinent Information</h5>
                <Field multiLine={true} fullWidth={true} name='unusualAbnormalObservation' label="unusual/abnormal situation observed(on weather, instrument, battery, marker, site)" component={renderTextField} />
                <Field multiLine={true} fullWidth={true} name='lodgingOrRoadInfo' label="lodging or road information" component={renderTextField} />
                <Field multiLine={true} fullWidth={true} name='pertinentInfo' label="other pertinent information" component={renderTextField} />
            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})


export default form(PertinentInfoFields);