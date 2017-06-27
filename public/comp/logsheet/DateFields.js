import React, { PureComponent } from 'react';
import { Field } from 'redux-form'

//ui
import { DatePicker, TextField } from 'material-ui'

Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

const renderDatePicker = ({ input, label, defaultValue, disabled, meta: { touched, error } }) => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    
        <div style={{flex: '1 1'}}>
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

        <div style={{flex: '1 1'}}>
            <TextField floatingLabelText='day of year' hintText='day of year' value={input.value.julianDate ? input.value.julianDate() : ''} disabled={true}
            fullWidth={false} 
                />
        </div>

        <div style={{flex: '1 1'}} />

    </div>
)

class DateFields extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dayofweek: ''
        };
    }  

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