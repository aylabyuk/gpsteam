import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

//ui
import { TimePicker } from 'material-ui'

const renderTimePicker = ({ input, label }) => (
    <TimePicker
      hintText={label}
      floatingLabelText={label}
    />
)

class TimeFields extends Component {
    render() {
        return (
            <div>
                <Field name="startTime" label='start time' component={renderTimePicker}  />
                <Field name="endTime" label='end time' component={renderTimePicker}  />
            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

export default form(TimeFields);