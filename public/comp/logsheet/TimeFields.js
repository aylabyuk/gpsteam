import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import ClearableTimePicker from './ClearableTimePicker';

//ui
import { TimePicker, Checkbox, IconButton} from 'material-ui'
import ContentClear from 'material-ui/svg-icons/content/clear';

const renderTimePicker = ({ input, ref, label, defaultValue, meta: { touched, error }, style }) => (
    <TimePicker
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      value = {input.value !== ''? input.value : null}
      onChange = {(event, value) => {input.onChange(value)}} 
      onBlur = {(value) => { value = '' } }
      style={style}
      ref={ref}
      format="24hr"
    />
)

class TimeFields extends Component {
    render() {
        return (
            <form style={{width: 778, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{flexShrink: 1}}><Field style={{width: 20}} name="startTime" label='start time(UTC)' component={renderTimePicker}  /></div>
                <div style={{flexShrink: 1}}><Field style={{width: 20}} name="endTime" label='end time(UTC)' component={renderTimePicker}  /></div>
                <div style={{flexShrink: 1}}><Field name="failureTime" component={ClearableTimePicker} label="failure time(UTC) - optional"/></div>
            </form>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

const selector = formValueSelector('logsheet') 
TimeFields = connect(
  state => {
    const failureTime = selector(state, 'failureTime')
    return {
      failureTime
    }
  }
)(TimeFields)

export default form(TimeFields)