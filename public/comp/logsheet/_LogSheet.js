import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import _LogSheetViewer from '../logsheetViewer/_LogsheetViewer';

// ui
import { AppBar, Paper, GridList, GridTile} from 'material-ui'
import SwipeableViews from 'react-swipeable-views';

const styles = {
  paper: {
    width: 'auto',
    height: '100%',
    padding: 5
  }
};

class _LogSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        return ( 
            <Paper style={styles.paper}>
                <AppBar title="Logsheets" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px', justifyContent: 'center'}}>
                    <Paper style={{ maxWidth: '800px', padding: '0px 25px 0px 25px', maxHeight: '100%'}}><LogSheetForm /></Paper>
                    {/*<_LogSheetViewer />*/}
                </div>
            </Paper>
        );
    }
}

export default _LogSheet;