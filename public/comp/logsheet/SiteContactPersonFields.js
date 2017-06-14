import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'

import SiteContacts from '../contacts/SiteContacts'
import NewContactDialog from '../contacts/NewContactDialog'
import { setSelectedContactKey } from '../../actions/index'
import { apolloClient } from '../../_primary'
import { changeSelectedContact } from '../../actions/index'


//ui
import { FlatButton, Dialog, TextField, IconButton, CircularProgress, 
    Toolbar, ToolbarSeparator, ToolbarGroup, ToolbarTitle, Menu, MenuItem, GridList } from 'material-ui'
import  ActionSearch from 'material-ui/svg-icons/action/search'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { cloneDeep, sortBy } from 'lodash'

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

const contactCreated = gql`
  subscription contactCreated {
    contactCreated {
      id
      first_name
      last_name
      contact_number
    }
  }
`;

class SiteContactPersonFields extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            openNew: false,
            searchText: '',
        }
        this.subscription = null
    }

    handleNewClose = () => {
        this.setState({openNew: false})
    }
    
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, searchText: ''});
    }

    handleNewContact = () => {
        this.setState({openNew: true});
    }

    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            let { subscribeToMore } = this.props.data
            this.subscription = [
                subscribeToMore({
                    document: contactCreated,
                    updateQuery: (previousResult, { subscriptionData }) => {

                        const newContact = subscriptionData.data.contactCreated
                        const newResult = cloneDeep(previousResult)

                        this.props.changeSelectedContactId(newContact.id)
                        
                        newResult.allContact.push(subscriptionData.data.contactCreated)
                        return newResult
                    },
                })
            ]
        }
    }
    

    render() {
        const actions = [
        <FlatButton
            label="New Contact"
            primary={true}
            onTouchTap={this.handleNewContact}
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


                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}} >
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
                    bodyStyle={{padding: 0}}
                    repositionOnUpdate={false}>
                    
                    <GridList
                        cellHeight={window.innerHeight * 0.6}
                        cols={1}
                        style={{width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden'}} 
                        id="style-5" >
                        <SiteContacts contacts={this.props.data.allContact} filter={this.state.searchText} closeDialog={this.handleClose} />                    
                    </GridList>

                    

                </Dialog>

                <NewContactDialog open={this.state.openNew} close={this.handleNewClose} closeParent={this.handleClose}/>

            </div>
        );
    }
}

export default connect(null, { changeSelectedContact })(graphql(ContactsQuery)(SiteContactPersonFields))