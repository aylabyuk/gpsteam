import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeSelectedContact } from '../../actions/index'

//ui
import { List, ListItem, Avatar, IconMenu, MenuItem, IconButton } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {pinkA200, transparent, grey400} from 'material-ui/styles/colors';


const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Details</MenuItem>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class SiteContacts extends Component {
    contactPersonChange = (contact) => {
        this.props.changeSelectedContact(contact)
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
                            onTouchTap={ () => this.contactPersonChange(d)}
                            rightIconButton={rightIconMenu}
                        /> : null
                    )
                }) }
             </List>
        );
    }
}   


export default connect(null, { changeSelectedContact })(SiteContacts) 
