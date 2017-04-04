import React, { Component } from 'react'
import { Field } from 'redux-form'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class MeasurementFields extends Component {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Measurements</h5>
                <form style={{display: "flex", flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    <div style={{flexGrow: 1}}><Field name="north" component={renderTextField} label="north" /></div>
                    <div style={{flexGrow: 1}}><Field name="east" component={renderTextField} label="east" /></div>
                    <div style={{flexGrow: 1}}><Field name="south" component={renderTextField} label="south" /></div>
                    <div style={{flexGrow: 1}}><Field name="west" component={renderTextField} label="west" /></div>
                    <div style={{flexGrow: 1}}><Field name="height" component={renderTextField} label="height" /></div>
                    <div style={{flexGrow: 1}}><Field name="aveSlantHeight" component={renderTextField} label="slant height" /></div>
                    <div style={{flexGrow: 1}}><Field name="azimuth" component={renderTextField} label="azimuth(deg)" /></div>
                </form>
            </div>
        );
    }
}

export default MeasurementFields;