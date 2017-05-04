import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import LogSheetViewer from '../logsheetViewer/LogsheetViewer';

// ui
import { AppBar, Paper, GridList, GridTile } from 'material-ui'

const styles = {
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
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
                <AppBar title="Logsheet" iconClassNameRight="muidocs-icon-navigation-expand-more" />

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px'}}>

                    <GridList
                        cellHeight={this.state.height - 100}
                        cols={1}
                        style={styles.gridList} 
                        id="style-5" >
                        <LogSheetForm />
                    </GridList>

                    <GridList
                        cellHeight={this.state.height - 100}
                        cols={1}
                        style={styles.gridList} 
                        id="style-5" >
                        <LogSheetViewer />
                    </GridList>

                </div>
            </Paper>
        );
    }
}

export default _LogSheet;