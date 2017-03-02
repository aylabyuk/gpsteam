import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'


import SiteContacts from '../contacts/SiteContacts'
import { setSelectedContactKey } from '../../actions/index'

//ui
import { FlatButton, Dialog, TextField, IconButton, CircularProgress, 
    Toolbar, ToolbarSeparator, ToolbarGroup, ToolbarTitle, Menu, MenuItem } from 'material-ui'
import  ActionSearch from 'material-ui/svg-icons/action/search'

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
        id
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

    handleClose = () => {
        this.setState({open: false, searchText: ''});
    }

    componentDidUpdate() {
        let result = this.props.data.allContact.find(x => x.id === this.props.contactId)

        if(result) {
            this.props.change('contactFirstName', result.first_name)
            this.props.change('contactLastName', result.last_name)
            this.props.change('contactNumber', result.contact_number)
        }
    }
    

    render() {
        const actions = [
        <FlatButton
            label="New Contact"
            primary={true}
            onTouchTap={this.handleClose}
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
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Contact Person</h5>

                { this.props.data.loading ? <CircularProgress /> : 
                    <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} /> }


                <div style={{width: 778, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}} >
                    <Field name="contactFirstName" component={renderTextField} label="first name" />
                    <Field name="contactLastName" component={renderTextField} label="last name" />
                    <Field name="contactNumber" component={renderTextField} label="number" />
                </div>
                
                <Dialog
                    title={ <div style={{padding: 0}}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="Site Contacts List" />
                            </ToolbarGroup> 
                            <ToolbarGroup>
                                <Menu disableAutoFocus={true}>
                                    <MenuItem leftIcon={<ActionSearch color='#fff' style={{left: 32}}/>} disabled={true}>
                                        <TextField fullWidth={true} id='searchContact' value={this.state.searchText}
                                        hintText='Search' onChange={e => this.setState({ searchText: e.target.value })}/>
                                    </MenuItem>
                                </Menu> 
                            </ToolbarGroup>
                        </Toolbar></div>
                        }
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: 0}}
                    repositionOnUpdate={false}>
                    
                    <SiteContacts contacts={this.props.data.allContact} filter={this.state.searchText} closeDialog={this.handleClose}/>

                </Dialog>

            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		contactId: state.ui.selectedContactId
	}
}

const form =  reduxForm({  
	form: 'logsheet'
})

export default connect(mapStateToProps)(form(graphql(ContactsQuery)(SiteContactPersonFields)))