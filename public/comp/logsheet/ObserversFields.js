import React, { Component } from 'react';

// ui
import { FlatButton, Dialog, TextField } from 'material-ui'
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
        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Observers</h5>
                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} />

                <Dialog
                    open={this.state.open}
                    autoScrollBodyContent={false}
                    bodyStyle={{padding: 0}}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={true} >

                    
                    <StaffForm openDrawer={this.state.openDrawer}/>
                    

                </Dialog>
            </div>
        );
    }
}

export default ObserversFields;