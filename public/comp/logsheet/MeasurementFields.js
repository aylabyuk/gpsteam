import React, { Component } from 'react'
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

class MeasurementFields extends Component {
    render() {
        return (
            <div>
                <form style={{width: 778, display: "flex", flexDirection: 'row', justifyContent: 'space-around'}}>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="height" component={renderTextField} label="height(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="north" component={renderTextField} label="north(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="east" component={renderTextField} label="east(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="south" component={renderTextField} label="south(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="west" component={renderTextField} label="west(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="aveSlantHeight" component={renderTextField} label="slantheight(m)" /></div>
                    <div style={{flexGrow: 1}}><Field style={{width: 108}} name="azimuth" component={renderTextField} label="azimuth" /></div>
                </form>
            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

export default form(MeasurementFields);