import React, { Component } from 'react';

//components
import DateFields from './DateFields'
import SiteFields from './SiteFields'

//ui
import { Paper } from 'material-ui'

const style = {
  margin: 20,
  display: 'inline-block',
  padding: 5
};

class LogSheetForm extends Component {
    componentDidMount() {
        this.props.siteNameData()
    }
    
    render() {
        return (
            <Paper style={style} zDepth={1}>
                <DateFields />
                <SiteFields />
            </Paper>
        );
    }
}

export default LogSheetForm  