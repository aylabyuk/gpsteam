import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//ui
import DataTables from 'material-ui-datatables';


const TABLE_COLUMNS = [
  {
    key: 'last_name',
    label: 'lastname'
  }, {
    key: 'first_name',
    label: 'firstname'
  }, {
    key: 'contact_number',
    label: 'contact number',
  }
];

const ContactsQuery = gql`
    query ContactsQuery($limit: Int, $offset: Int) {
    allContact(order: "last_name ASC", limit: $limit, offset: $offset) {
        first_name
        last_name
        contact_number
    }
}`;

const ITEMS_PER_PAGE = 10;
const SiteContactsWithData = graphql(ContactsQuery, {
    options(props) {
        return {
            variables: {
                offset: 0,
                limit: ITEMS_PER_PAGE
            },
            forceFetch: true,
        };
    },
    props({ data: { loading, fetchMore, allContact } }) {
        return {
            loading,
            allContact,
            loadMoreContacts() {
                return fetchMore({
                    variables: {
                        offset: allContact.length,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult.data) { return previousResult; }
                        return Object.assign({}, previousResult, {
                        // Append the new feed results to the old one
                        allContact: [...previousResult.feed, ...fetchMoreResult.data.feed],
                        });
                    },
                });
            },
        };
    },
})


class SiteContacts extends Component {

    constructor(props, context) {
        super(props, context);
            this.state = {
                page: 1
            }
    }

    handleSelection = (key) => {
        // this.props.setSelectedTableKey(key)
    };

    handleFilterValueChange(value) {

    }
      
    render() {
        return(
             <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={ this.props.allContact }
                showCheckboxes={true}
                showHeaderToolbar={true}
                filterHintText='Search'
                onFilterValueChange={this.handleFilterValueChange}
                onRowSelection={this.handleSelection}
                page={this.state.page}
                count={10}
            />
        );
    }
}   


export default (SiteContactsWithData)(SiteContacts)  
