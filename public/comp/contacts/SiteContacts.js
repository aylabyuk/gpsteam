import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

//ui
import { List, ListItem } from 'material-ui'

class SiteContacts extends Component {
    constructor(props, context) {
        super(props, context);
    }
      
    render() {
        return(
             <List>
                { this.props.contacts.map((d) => {
                    return (
                        <ListItem
                            primaryText={ d.last_name + ', ' + d.first_name }
                            secondaryText={ d.contact_number }
                            key={ d.contact_id }
                        />
                    )
                }) }
             </List>
        );
    }
}   


export default SiteContacts
