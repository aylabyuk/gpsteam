import React, { PureComponent } from 'react';
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
import Clear from 'material-ui/svg-icons/content/clear';
import SearchBar from 'material-ui-search-bar'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// use these library to work with the result from the graphql queries
import { cloneDeep, sortBy } from 'lodash'

// render a textfield that contains a clear iconbutton 
// only display the button when the clearIcon props is true
// position the button on the rightmost side of the textfield 
const renderTextField = ({clear, clearIcon, input, label, meta: { touched, error }, ...custom }) => (
    <div style={{position: 'relative', display: 'inline-block'}}>
        <div style={{position: 'absolute', right: 12, top: 25, width: 20, height: 20}}>
            { label == 'number' && clearIcon ? <IconButton tooltip="clear" tooltipPosition="top-center" onTouchTap={()=> clear() }>
                <Clear />
            </IconButton> : null}
        </div>
        <TextField
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
            disabled={true}
            />
    </div>
)

// just query the information needed to display to user
const ContactsQuery = gql`
    query ContactsQuery {
    allContact(order: "last_name") {
        id
        first_name
        last_name
        contact_number
    }
}`;

// subscribe when new contact was created
// again query only information we need to display to the user
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

class SiteContactPersonFields extends PureComponent {
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

    handleClear = () => {
        this.props.changeSelectedContact(null)
        this.props.change('contactFirstName', '')
        this.props.change('contactLastName', '')
        this.props.change('contactNumber', '')
    }

    // subscription for newly created data takes place here
    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            let { subscribeToMore } = this.props.data

            this.subscription = [
                subscribeToMore({
                    document: contactCreated,
                    updateQuery: (previousResult, { subscriptionData }) => {

                        // create a clone of the already saved data before pushing another data to the list
                        const newContact = subscriptionData.data.contactCreated
                        const newResult = cloneDeep(previousResult)

                        // set the redux store selected contact with the new one created when the data arrives
                        this.props.changeSelectedContact(newContact)
                        
                        // add the new contact to the data result/list of all contacts
                        // this will become the return value for the subscription
                        newResult.allContact.push(subscriptionData.data.contactCreated)
                        return newResult
                    },
                })
            ]
        }
    }

    // in the event of user changing the selected contact id the redux-form fields will also change
    componentWillUpdate(nextProps, nextState) {
        // test if the selected contact props is changed (using this.props and nextprops)
        if(this.props.selectedContact != nextProps.selectedContact && nextProps.selectedContact) {
            this.props.change('contactFirstName', nextProps.selectedContact.first_name)
            this.props.change('contactLastName', nextProps.selectedContact.last_name)
            this.props.change('contactNumber', nextProps.selectedContact.contact_number)
        }
    }
    

    render() {

        // rendering the action buttons for the component
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
                    !this.props.ro ? <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} /> : null }

                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}} >
                    <Field name="contactFirstName" component={renderTextField} label="first name" />
                    <Field name="contactLastName" component={renderTextField} label="last name" />
                    <Field name="contactNumber" component={renderTextField} clear={this.handleClear} label="number" clearIcon={this.props.selectedContact && !this.props.ro ? true : false}/>
                </div>
                
                <Dialog
                    title={ <div style={{padding: 0}}>
                        <Toolbar>
                             <ToolbarGroup>
                                <ToolbarTitle text="Contacts" />
                            </ToolbarGroup> 
                            <ToolbarGroup>
                                <SearchBar 
                                    onRequestSearch={(value) => null }
                                    value={this.state.searchText}
                                    onChange={(value) => this.setState({ searchText: value })}/>
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
                        style={{width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden'}} >
                        <SiteContacts contacts={this.props.data.allContact} filter={this.state.searchText} closeDialog={this.handleClose} />                    
                    </GridList>

                </Dialog>

                <NewContactDialog open={this.state.openNew} close={this.handleNewClose} closeParent={this.handleClose}/>
            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedContact: state.ui.selectedContact
	}
}

export default connect(null, { changeSelectedContact })(graphql(ContactsQuery)(SiteContactPersonFields))