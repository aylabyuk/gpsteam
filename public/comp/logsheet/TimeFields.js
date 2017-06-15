import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
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
                    <Field name="startTime" component={ClearableTimePicker} label="start time(UTC)" />
                    <Field name="endTime" component={ClearableTimePicker} label="end time(UTC)" />
                    <Field name="failureTime" component={ClearableTimePicker} label="failure time(UTC)"/>
                </form>
            </div>
        );
    }
}

export default TimeFields