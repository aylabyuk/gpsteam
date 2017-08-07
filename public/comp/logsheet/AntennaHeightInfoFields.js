import React, { PureComponent } from 'react';
import { Field } from 'redux-form'
// normalization module is imported to help format each field
// see normalization documentation in redux-form
import { numberAddress, onlyDecimal, wholeNumber } from '../formValidators/formValidators'

//ui
import { TextField, DatePicker } from 'material-ui'

// re-use the julianDate code from DateFields Component
Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

const renderTextField = ({ input, label, disabled, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    disabled={disabled}
  />
)

// for each field supply renderTextField as the rendered component
// on readonly mode all of these fields are disabled
// normalization is used depending on the field values '../formValidators/formValidators' 
class AntennaHeightInfoFields extends PureComponent {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Antenna Information</h5>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <Field disabled={this.props.ro} name='rodNo' label="rod no." component={renderTextField} normalize={onlyDecimal}/>
                    <Field disabled={this.props.ro} name='rodCorrection' label="rod correction" component={renderTextField} />
                    <Field disabled={this.props.ro} name='ipAddress' label="IP address" component={renderTextField} normalize={numberAddress}/>
                    <Field disabled={this.props.ro} name='netmask' label="netmask" component={renderTextField} normalize={numberAddress}/>
                    <Field disabled={this.props.ro} name='gateway' label="gateway" component={renderTextField} normalize={numberAddress}/>
                    <Field disabled={this.props.ro} name='dns' label="DNS" component={renderTextField}  />
                    <Field disabled={this.props.ro} name='localTcpPort' label="local TCP port" component={renderTextField}  normalize={wholeNumber}/>
                    <Field disabled={this.props.ro} name='lat' label="rough coordinate - latitude" component={renderTextField} />
                    <Field disabled={this.props.ro} name='long' label="rough coordinate - longitude" component={renderTextField} />
                </div>
            </div>
        );
    }
}

export default AntennaHeightInfoFields;