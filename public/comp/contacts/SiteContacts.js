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
        let { filter, contacts } = this.props

        return(
             <List>
                { contacts.map((d) => {
                    let fname = d.last_name + ', ' + d.first_name
                    let exp = new RegExp('' + filter)
                    let toList = exp.test(fname)

                    return (
                        toList ? 
                        <ListItem
                            primaryText={ fname }
                            secondaryText={ d.contact_number }
                            key={ d.contact_id }
                        /> : null
                    )
                }) }
             </List>
        );
    }
}   


export default SiteContacts
