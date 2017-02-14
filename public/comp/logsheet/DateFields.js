import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

//ui
import { DatePicker, TextField } from 'material-ui'

const style = {
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

const renderDatePicker = ({ input, label, defaultValue, meta: { touched, error } }) => (
    <div>
    <DatePicker 
        mode='landscape'
        errorText = {touched && error} 
        {...input}
        value = {input.value !== ''? new Date(input.value) : null}
        formatDate={new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
        }).format}
        hintText={label}
        floatingLabelText={label}
        onChange = {(event, value) => {console.log(value.julianDate()); input.onChange(value)}} />
    <TextField floatingLabelText='julian day equivalent'  hintText='julian day' value={input.value ? input.value.julianDate() : ''} disabled={true}/>
    </div>
)

const form =  reduxForm({  
	form: 'logsheet'
})

class DateFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayofweek: ''
        };
    }  

    render() {
        
        return (
        <form>
            <Field name="logdate" label='Log Date' component={renderDatePicker} autoOk={true} />
        </form>
        );
    }
}


export default form(DateFields)