import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import _LogSheetViewer from '../logsheetViewer/_LogsheetViewer';
import { connect } from 'react-redux'

// ui
import { AppBar, Paper, GridList, GridTile, IconMenu, MenuItem, IconButton, Drawer} from 'material-ui'
import SwipeableViews from 'react-swipeable-views';
import { AutoSizer } from 'react-virtualized';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors'

import { toggleLogsheetViewerDrawer } from '../../actions/index'


class _LogSheet extends Component {
    render() {
        const AppBarMenu = (props) => (
            <IconMenu
                {...props}
                iconButtonElement={
                <IconButton ><MoreVertIcon color={white}/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Search for Logsheets" onTouchTap={() => this.props.toggleLogsheetViewerDrawer()}/>
                <MenuItem primaryText="Switch to Continuous" />
                <MenuItem primaryText="Close" />
            </IconMenu>
        );

        return ( 
            <Paper style={{ padding: 0, height: '100vh'}}>
                <AppBar title="Logsheets" iconElementRight={<AppBarMenu />}/>
                <AutoSizer>
                    {({ height, width }) => (
                        <div style={{ height: height-65, width, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Paper style={{ maxWidth: '850px', padding: '0px 25px 0px 25px', overflow: 'auto'}}><LogSheetForm /></Paper>
                        </div>
                    )}
                </AutoSizer>

                <Drawer docked={false} containerStyle={{overflow: 'hidden'}} width={400} open={this.props.open} openSecondary={true}>
                    <_LogSheetViewer />
                </Drawer>

            </Paper>
        );
    }
}

function mapStateToProps(state) {  
	return {
		open: state.ui.logsheetViewerDrawer,
	}
}

export default connect(mapStateToProps, { toggleLogsheetViewerDrawer })(_LogSheet);