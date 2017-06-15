import React, { PureComponent } from 'react';
import LogSheetForm from './LogSheetForm';
import _LogSheetViewer from '../logsheetViewer/_LogsheetViewer';

// ui
import { AppBar, Paper, GridList, GridTile} from 'material-ui'
import SwipeableViews from 'react-swipeable-views';

const styles = {
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  gridTile: {
      overflowX: 'hidden',
      overflowY: 'auto',
  },
  paper: {
    width: 'auto',
    height: '100%',
    padding: 5
  }
};

class _LogSheet extends PureComponent {
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

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px'}}>

                    <GridList
                        cellHeight={this.state.height - 100}
                        cols={2}
                        style={styles.gridList} >

                        <GridTile style={styles.gridTile}>
                            <LogSheetForm />
                        </GridTile>

                        <GridTile style={{height: '100%'}}>
                            <_LogSheetViewer />
                        </GridTile>

                    </GridList>

                </div>
            </Paper>
        );
    }
}

export default _LogSheet;