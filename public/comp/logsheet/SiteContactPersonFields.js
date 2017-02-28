import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'


import SiteContacts from '../contacts/SiteContacts'
import { setSelectedContactKey } from '../../actions/index'

//ui
import { FlatButton, Dialog, TextField, IconButton } from 'material-ui'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

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

    handleCancel = () => {
        this.setState({open: false});
    }

    render() {

        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleCancel}
        />,
        <FlatButton
            label="Select"
            primary={true}
            disabled={false}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Contact Person</h5>
                {/*{ this.props.selectedContactKey == 'notset' ?  : 
                    <div>
                        <Field name="contactName"  component={renderTextField} label='contact name' />
                        <Field name="contactNumber" style={{ marginLeft: 5}}  component={renderTextField} label='contact number' />
                        <IconButton style={{top: 5}}>
                            <EditorModeEdit onTouchTap={this.handleOpen}/>
                        </IconButton>
                    </div>
                }*/}

                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen}/>

                <Dialog
                    title="Site Contacts List"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={false}
                    bodyStyle={{height: 200}}>
                    
                    <SiteContacts />

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