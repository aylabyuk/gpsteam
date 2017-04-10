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
        position {
            id
            position_name
        }
        division {
            id
            division_name
        }
        contact_numbers {
            id
            number
        }
        emails {
            id
            address
        }
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

                return (
                    <ListItem
                        leftAvatar={
                            <Avatar
                                color={fullWhite} backgroundColor={grey500}
                                style={{left: 8}}
                            > { firstChar + secondChar } </Avatar>
                        }
                        primaryText={ d.first_name + ' ' + d.last_name + ' (' + d.position.position_name + '/' + d.division.division_name + ')' }
                        key={ d.id }
                    /> 
                )
            }) }
            </List>
        );
    }
}

export default StaffList;