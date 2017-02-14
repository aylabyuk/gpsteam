import React, { Component } from 'react';
import DateFields from './DateFields'

//ui
import { Paper } from 'material-ui'

class LogSheetForm extends Component {
    render() {
        return (
            <Paper zDepth={1}>
                <DateFields />
            </Paper>
        );
    }
}

export default LogSheetForm  