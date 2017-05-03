import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import LogSheetViewer from '../logsheetViewer/LogsheetViewer';

// ui
import { AppBar, Paper } from 'material-ui'

class _LogSheet extends Component {
    render() {
        return ( 
            <Paper style={{ margin: 0 }}>
                <AppBar
                        title="Log Sheet"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                <div style={{display: 'flex', flexDirection: 'row'}} >
                    <LogSheetForm /> 
                    <LogSheetViewer />
                </div>
            </Paper>
        );
    }
}

export default _LogSheet;