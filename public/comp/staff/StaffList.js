import React, { Component } from 'react';
import { cloneDeep, sortBy } from 'lodash'

//ui
import { List, ListItem, Avatar } from 'material-ui';
import {fullWhite, transparent, grey500} from 'material-ui/styles/colors';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const staffCreated = gql`
  subscription staffCreated {
    staffCreated {
        id
        first_name
        last_name
        nickname
        position_id
        contact_num
        division_id
        email_address
        office_location
        birthday
    }
  }
`;

class StaffList extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            let { subscribeToMore } = this.props.data
            this.subscription = [
                subscribeToMore({
                    document: staffCreated,
                    updateQuery: (previousResult, { subscriptionData }) => {

                        const newContact = subscriptionData.data.staffCreated
                        const newResult = cloneDeep(previousResult)
                        
                        newResult.allStaff.push(subscriptionData.data.staffCreated)
                        return newResult
                    },
                })
            ]
        }
    }

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