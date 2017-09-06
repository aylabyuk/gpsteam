import React, { PureComponent } from 'react'
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

// This is a custom component responsible in rendering the TimePicker component
import ClearableTimePicker from './ClearableTimePicker';

//ui
import { TimePicker, Checkbox, IconButton} from 'material-ui'
import ContentClear from 'material-ui/svg-icons/content/clear';

// this component will be used to render a custom time selection/picker 
// in recording the startTime endTime and failureTime
// each of the fields uses the ClearableTimePicker as the rendered component
// if the state is in read only mode (this.props.ro) the fields are all disabled
class TimeFields extends PureComponent {
    render() {
        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Time Logs and Status</h5>
                <form style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <Field name="startTime" disabled={false || this.props.ro} component={ClearableTimePicker} label="start time(UTC)" />
                    <Field name="endTime"  disabled={this.props.failureTime ? true : false || this.props.ro} component={ClearableTimePicker} label="end time(UTC)" />
                    <Field name="failureTime"  disabled={this.props.endTime ? true : false || this.props.ro} component={ClearableTimePicker} label="failure time(UTC)"/>
                </form>
            </div>
        );
    }
}

// In the case that the state of the app is in readonly. Get the state of the redux-form named 'logsheet'
// specifically extract the endTime and failureTime values from the logsheet form and then map it as props to the TimeFields component
const selector = formValueSelector('logsheet') 
TimeFields = connect(
  state => {
    const endTime = selector(state, 'endTime')
    const failureTime = selector(state, 'failureTime')
    return {
      endTime,
      failureTime
    }
  }
)(TimeFields)

export default TimeFields;