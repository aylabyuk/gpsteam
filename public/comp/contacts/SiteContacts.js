import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeSelectedContactId } from '../../actions/index'

//ui
import { List, ListItem, Avatar } from 'material-ui'
import {pinkA200, transparent} from 'material-ui/styles/colors';


class SiteContacts extends Component {
    contactPersonChange = (id) => {
        this.props.changeSelectedContactId(id)
        this.props.closeDialog()
    }
    
    render() {
        let { filter, contacts } = this.props

        return(
             <List>
                { contacts.map((d) => {
                    let fullname = d.first_name + ' ' + d.last_name
                    let exp = (fullname.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                    let toList = exp

                    let firstChar = d.first_name.charAt(0)
                    let secondChar = d.last_name.charAt(0)

                    return (
                        toList ? 
                        <ListItem
                            leftAvatar={
                                <Avatar
                                    color={pinkA200} backgroundColor={transparent}
                                    style={{left: 8}}
                                > { firstChar + secondChar } </Avatar>
                            }
                            primaryText={ d.first_name + ' ' + d.last_name }
                            secondaryText={ d.contact_number }
                            key={ d.id }
                            onTouchTap={ () => this.contactPersonChange(d.id)}
                        /> : null
                    )
                }) }
             </List>
        );
    }
}   


export default connect(null, { changeSelectedContactId })(SiteContacts) 
