import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'


import SiteContacts from '../contacts/SiteContacts'
import { setSelectedContactKey } from '../../actions/index'

//ui
import { FlatButton, Dialog, TextField } from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    disabled={true}
  />
)

class SiteContactPersonFields extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.setSelectedContactKey(this.props.selectedKey)

        this.setState({open: false});
    };

    componentDidUpdate() {
        if(this.props.selectedContactKey != 'notset') {
            this.props.dispatch(change('logsheet', 'contactName', 
                this.props.contacts[this.props.selectedContactKey].first_name + ' ' + this.props.contacts[this.props.selectedContactKey].last_name))
            this.props.dispatch(change('logsheet', 'contactNumber', this.props.contacts[this.props.selectedContactKey].contact_number))
        } else {
            this.props.dispatch(change('logsheet', 'contactName', ''))
            this.props.dispatch(change('logsheet', 'contactNumber', ''))
        }
    }

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
            disabled={this.props.selectedKey.length ==  0 ? true : false}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Contact Person</h5>
                { this.props.selectedContactKey == 'notset' ? <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen}/> : 
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Field style={{flexGrow: 1}} name="contactName"  component={renderTextField} label='contact name' />
                        <Field style={{flexGrow: 1}} name="contactNumber"  component={renderTextField} label='contact number' />
                    </div>
                }

                <Dialog
                    title="Site Contacts List"
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    
                    <SiteContacts contacts={this.props.contacts} />

                </Dialog>

            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

function mapStateToProps(state) {  
	return {
		selectedKey: state.uiState.selectedKey,
        selectedContactKey: state.uiState.logsheet.selectedContactKey
	}
}

export default connect(mapStateToProps, { setSelectedContactKey } )(form(SiteContactPersonFields))  