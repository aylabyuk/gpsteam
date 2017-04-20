import React, { Component } from 'react';

// ui
import { FlatButton, Dialog, Toolbar, ToolbarGroup, ToolbarTitle, MenuItem, Menu, TextField } from 'material-ui'
import  ActionSearch from 'material-ui/svg-icons/action/search'

import StaffForm from '../staff/StaffForm'


class ObserversFields extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            openDrawer: true
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    }

    handleNew = () => {
        this.setState({openDrawer: true})
    }

    render() {
        const actions = [
        <FlatButton
            label="Create New"
            primary={true}
            onTouchTap={this.handleNew}
        />,
        <FlatButton
            label="Cancel"
            primary={true}
            disabled={false}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Observers</h5>
                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} />

                <Dialog
                    title={ <div style={{padding: 0}}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Select Observers" />
                            </ToolbarGroup> 
                            <ToolbarGroup>
                                <Menu disableAutoFocus={true} style={{display: 'flex', flexDirection: 'row'}}>
                                    <MenuItem leftIcon={<ActionSearch color='#fff' style={{left: 32}}/>} disabled={true}>
                                        <TextField fullWidth={true} id='searchStaff'
                                        hintText='Search' onChange={e => this.setState({ searchText: e.target.value })}/>
                                    </MenuItem>
                                </Menu> 
                            </ToolbarGroup>
                        </Toolbar></div>
                        }
                    actions={actions}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: 0}}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={true} >

                    <div id='clip' style={{clipPath: 'inset(0px)'}}>
                        <StaffForm openDrawer={this.state.openDrawer}/>
                    </div>

                </Dialog>

            </div>
        );
    }
}

export default ObserversFields;