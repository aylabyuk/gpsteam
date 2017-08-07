import React, { PureComponent } from 'react';
import { Field } from 'redux-form'

//ui
import { DatePicker, TextField } from 'material-ui'


// create a prototyped function that will compute the equivalent julian date or day of year from a given date object
Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

// compose a new component to for the logsheet date field
const renderDatePicker = ({ input, label, defaultValue, disabled, meta: { touched, error } }) => (
    // wrap the components in a flexbox div
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{flex: '1 1'}}>
            {/* this is actual datepicker used
                formating the date to 'en-US' int'l standard format
                *you can refer to Material-UI datepicker documentation for more detailed explanation for each attributes
              */}
            <DatePicker 
                mode='portrait'
                errorText = {touched && error} 
                {...input}
                value = { input.value !== ''? new Date(input.value): null}
                formatDate={new Intl.DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        weekday: 'long'
                }).format }
                hintText={label}
                floatingLabelText={label}
                onChange = {(event, value) => {input.onChange(value)} } 
                onBlur = {(value) => { value = '' }}
                maxDate={new Date()}
                disabled={disabled}/>
        </div>
        
        {/* along with the datepicker component a textfield will also be rendered and will automatically received a value when data from the datepicker changes
            the julianDate function will be called to compute for the equivalent day of year value of the given date.
         */}
        <div style={{flex: '1 1'}}>
            <TextField floatingLabelText='day of year' hintText='day of year' value={input.value.julianDate ? input.value.julianDate() : ''} disabled={true}
            fullWidth={false} 
                />
        </div>

        <div style={{flex: '1 1'}} />

    </div>
)

// the exported component
// redux-form require a name for each field. In this component the name is logdate
// each attribute for the field component will be passed as props to the rendered component which is the renderDatePicker
// if this.props.ro is true this means that we are in the read only mode and the field must be disabled to prevent editing.
class DateFields extends PureComponent {
    render() {
        return (
        <form>
            <Field name="logdate" label='log date' component={renderDatePicker} autoOk={false} 
                disabled={this.props.ro}/>
        </form>
        );
    }
}

export default DateFields