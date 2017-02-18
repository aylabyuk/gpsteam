import React, { Component } from 'react';
import { connect } from 'react-redux'

import SiteContacts from '../contacts/SiteContacts'
import { fetchSiteContacts } from '../m/m.js'

//ui
import { FlatButton, Dialog } from 'material-ui'

class SiteContactPersonFields extends Component {
    state = {
        open: false,
        contacts: fetchSiteContacts()
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label="Select"
            primary={true}
            disabled={this.props.selectedKey ? false : true}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Contact Person</h5>
                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen}/>

                <Dialog
                    title="Site Contacts List"
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    
                    <SiteContacts contacts={this.state.contacts} />

                </Dialog>

            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedKey: state.serverData.selectedContact
	}
}

export default connect(mapStateToProps)(SiteContactPersonFields)  