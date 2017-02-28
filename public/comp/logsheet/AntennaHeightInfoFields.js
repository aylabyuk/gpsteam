import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

//ui
import { TextField, DatePicker } from 'material-ui'

Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
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
                    <DatePicker hintText='Observation Date' floatingLabelText='Observation Date' 
                        disabled={true} 
                        value={this.props.logdate ? new Date(this.props.logdate) : null}
                        formatDate={new Intl.DateTimeFormat('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                weekday: 'long'
                        }).format}/>
                    <TextField hintText='Session(Day of Year)' floatingLabelText='Session(Day of Year)' disabled={true} value={this.props.logdate ? this.props.logdate.julianDate() : ''} />
                    <Field name='rodNo' label="rod no." component={renderTextField} />
                    <Field name='rodCorrection' label="rod correction" component={renderTextField}  />
                    <TextField hintText='average slant antenna height' floatingLabelText='average slant antenna height' disabled={true} value={this.props.aveSlantHeight ? this.props.aveSlantHeight : ''}/>
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

const selector = formValueSelector('logsheet') 
AntennaHeightInfoFields = connect(
  state => {
    const logdate = selector(state, 'logdate')
    const aveSlantHeight = selector(state, 'aveSlantHeight')
    return {
      logdate,
      aveSlantHeight
    }
  }
)(AntennaHeightInfoFields)

export default form(AntennaHeightInfoFields);