import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import _LogSheetViewer from '../logsheetViewer/_LogsheetViewer';

// ui
import { AppBar, Paper, GridList, GridTile, IconMenu, MenuItem, IconButton} from 'material-ui'
import SwipeableViews from 'react-swipeable-views';
import { AutoSizer } from 'react-virtualized';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors'

const AppBarMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton ><MoreVertIcon color={white}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Search for Logsheets" />
    <MenuItem primaryText="Switch to Continuous" />
    <MenuItem primaryText="Close" />
  </IconMenu>
);

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
            <Paper style={{ padding: 0, height: '100vh'}}>
                <AppBar title="Logsheets" iconElementRight={<AppBarMenu />}/>
                <AutoSizer>
                    {({ height, width }) => (
                        <div style={{ height: height-65, width, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Paper style={{ maxWidth: '850px', padding: '0px 25px 0px 25px', overflow: 'auto'}}><LogSheetForm /></Paper>
                            {/*<_LogSheetViewer />*/}
                        </div>
                    )}
                </AutoSizer>
            </Paper>
        );
    }
}

export default _LogSheet;