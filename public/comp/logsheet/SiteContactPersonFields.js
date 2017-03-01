import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'


import SiteContacts from '../contacts/SiteContacts'
import { setSelectedContactKey } from '../../actions/index'

//ui
import { FlatButton, Dialog, TextField, IconButton, CircularProgress } from 'material-ui'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    disabled={true}
  />
)


const ContactsQuery = gql`
    query ContactsQuery {
    allContact(order: "last_name ASC") {
        contact_id
        first_name
        last_name
        contact_number
    }
}`;

class SiteContactPersonFields extends Component {
    state = {
        open: false,
        searchText: ''
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

                { this.props.data.loading ? <CircularProgress /> : 
                    <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} /> }
                
                <Dialog
                    title={ <div><span>Site Contacts List</span> <br/> 
                                <TextField fullWidth={true} id='searchContact' value={this.state.searchText}
                                floatingLabelText='Search' onChange={e => this.setState({ searchText: e.target.value })}/>
                            </div> 
                        }
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: 0}}>
                    
                    <SiteContacts contacts={this.props.data.allContact} filter={this.state.searchText}/>

                </Dialog>

            </div>
        );
    }
}

export default graphql(ContactsQuery)(SiteContactPersonFields) 