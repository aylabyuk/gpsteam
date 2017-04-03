import React, { Component } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import ClearableTimePicker from './ClearableTimePicker';

//ui
import { TimePicker, Checkbox, IconButton} from 'material-ui'
import ContentClear from 'material-ui/svg-icons/content/clear';

class TimeFields extends Component {
    render() {
        return (
            <form style={{width: 778, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{flexShrink: 1}}><Field name="startTime" component={ClearableTimePicker} label="start time(UTC)"/></div>
                <div style={{flexShrink: 1}}><Field name="endTime" component={ClearableTimePicker} label="end time(UTC)"/></div>
                <div style={{flexShrink: 1}}><Field name="failureTime" component={ClearableTimePicker} label="failure time(UTC)"/></div>
            </form>
        );
    }
}

export default TimeFields