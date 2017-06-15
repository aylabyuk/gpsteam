import React, { PureComponent } from 'react';
import { Field } from 'redux-form'
import { numberAddress, onlyDecimal, wholeNumber } from '../formValidators/formValidators'
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

class AntennaHeightInfoFields extends PureComponent {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Antenna Information</h5>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <Field name='rodNo' label="rod no." component={renderTextField} normalize={onlyDecimal}/>
                    <Field name='rodCorrection' label="rod correction" component={renderTextField} />
                    <Field name='ipAddress' label="IP address" component={renderTextField} normalize={numberAddress}/>
                    <Field name='netmask' label="netmask" component={renderTextField} normalize={numberAddress}/>
                    <Field name='gateway' label="gateway" component={renderTextField} normalize={numberAddress}/>
                    <Field name='dns' label="DNS" component={renderTextField}  />
                    <Field name='localTcpPort' label="local TCP port" component={renderTextField}  normalize={wholeNumber}/>
                    <Field name='lat' label="rough coordinate - latitude" component={renderTextField} />
                    <Field name='long' label="rough coordinate - longitude" component={renderTextField} />
                </div>
            </div>
        );
    }
}

export default AntennaHeightInfoFields;