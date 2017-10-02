// import React and redux
// import all sub components
import React, { Component } from 'react';
import LogSheetForm from './LogSheetForm';
import _LogSheetViewer from '../logsheetViewer/_LogsheetViewer';
import { connect } from 'react-redux'

// import all nessesary ui packages 
import { AppBar, Paper, GridList, GridTile, IconMenu, MenuItem, IconButton, FlatButton} from 'material-ui'
import SwipeableViews from 'react-swipeable-views';
import { AutoSizer } from 'react-virtualized';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import { white } from 'material-ui/styles/colors'

// these are available redux actions to be use in the component
import { toggleSearchLogsheet, setLogsheetMode, toggleSideNav } from '../../actions/index'


// This _Logsheet component is a parent node that holds logsheet related views  
class _LogSheet extends Component {
    handleClose() {
        this.props.toggleSearchLogsheet()
    }
    
    render() {

        // create the AppBar menu with three selections namely Search, Create and Close
        const AppBarMenu = (props) => (
            <div>
            <IconMenu
                {...props}
                iconButtonElement={
                <IconButton ><MoreVertIcon color={white}/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Search" onTouchTap={() => this.props.toggleSearchLogsheet()}/>
                <MenuItem primaryText="Create" onTouchTap={() => this.props.setLogsheetMode('new')}/>
            </IconMenu>
            </div>
        );

        // The main appbar of the component, assigning the AppBarMenu as an element on the right side of the Appbar
        return ( 
            <Paper style={{ padding: 0, height: '100vh'}}>
                <AppBar title={<div className='titletext'>GPS Logsheets</div>} iconElementRight={<AppBarMenu />} onLeftIconButtonTouchTap={()=> this.props.toggleSideNav()}/>

                {// use autosizer module to identify the available width and height 
                    // within this tags create a div that will hold the LogSheetForm component
                    }

                <AutoSizer>
                    {({ height, width }) => (
                        <div style={{ height: height-65, width, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Paper style={{ maxWidth: '850px', padding: '0px 25px 0px 25px', overflow: 'auto'}}><LogSheetForm /></Paper>
                        </div>
                    )}
                </AutoSizer>

                <FullscreenDialog
                    immersive={false}
                    open={this.props.open}
                    onRequestClose={()=> this.handleClose()}
                    title={'Search Logsheets'}
                    actionButton={<FlatButton
                        label='Done'
                        onClick={()=> this.handleClose()}
                    />}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <_LogSheetViewer />
                    </div>
                </FullscreenDialog>

            </Paper>
        );
    }
}


// get the global ui state from the store
// mapping all state as props to the _Logsheet component
function mapStateToProps(state) {  
	return {
		open: state.ui.logsheetSearch,
        logsheetMode: state.ui.logsheetMode
	}
}

// create a redux Higher Order Component and attach using the connect method.. 
// this means that mapStateToProps, toggleLogsheetViewerDrawer and setLogsheetMode will be available as props to the component
export default connect(mapStateToProps, { toggleSearchLogsheet, setLogsheetMode, toggleSideNav })(_LogSheet);