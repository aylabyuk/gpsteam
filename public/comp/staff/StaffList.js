import React, { Component } from 'react';

//ui
import { List, ListItem, Avatar } from 'material-ui';
import {fullWhite, transparent, grey500} from 'material-ui/styles/colors';

class StaffList extends Component {
    render() {
        let { data } = this.props

        return (
            <List>
            { data.allStaff.map((d) => {
                let fullname = d.first_name + ' ' + d.last_name
               
                let firstChar = d.first_name.charAt(0)
                let secondChar = d.last_name.charAt(0)
                
                let pos = data.allPosition.find((x) => x.id == d.position_id)
                let div = data.allDivision.find((x) => x.id == d.division_id)

                return (
                    <ListItem
                        leftAvatar={
                            <Avatar
                                color={fullWhite} backgroundColor={grey500}
                                style={{left: 8}}
                            > { firstChar + secondChar } </Avatar>
                        }
                        primaryText={ d.first_name + ' ' + d.last_name + ' (' + pos.position_name + '/' + div.division + ')' }
                        secondaryText={ 
                            d.email_address + '/' +
                            d.contact_num  }
                        key={ d.id }
                    /> 
                )
            }) }
            </List>
        );
    }
}

export default StaffList;