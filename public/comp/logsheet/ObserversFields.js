import React, { Component } from 'react';

// ui
import { FlatButton, Dialog } from 'material-ui'

import StaffForm from '../staff/StaffForm'

class ObserversFields extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false, 
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    }


    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Observers</h5>
                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} />

                <Dialog
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: 0}}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={true}>
                    
                    <StaffForm />

                </Dialog>

            </div>
        );
    }
}

export default ObserversFields;