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
    height: 'auto',
    padding: 8
  }
};

class _LogSheet extends Component {
    render() {
        return ( 
            <Paper style={styles.paper}>
                <AppBar title="Logsheet" iconClassNameRight="muidocs-icon-navigation-expand-more" />

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px'}}>

                    <GridList
                        cellHeight={825}
                        cols={1}
                        style={styles.gridList} 
                         id="style-5" >
                        <LogSheetForm />
                    </GridList>

                    <GridList
                        cellHeight={825}
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