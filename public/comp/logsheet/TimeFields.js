import React, { PureComponent } from 'react'
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import ClearableTimePicker from './ClearableTimePicker';

//ui
import { TimePicker, Checkbox, IconButton} from 'material-ui'
import ContentClear from 'material-ui/svg-icons/content/clear';

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