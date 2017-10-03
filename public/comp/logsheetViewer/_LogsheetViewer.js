import React, { Component } from 'react';

// ui
import Filter from './Filter'
import SearchResults from './SearchResults'

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import moment from 'moment'

const Logsheets = gql`query LogsheetsQuery($sitename: [String], $startDate: Date, $endDate: Date) {
    searchLogsheet(sitename: $sitename, 
      startDate: $startDate, 
      endDate: $endDate) 
    {
      id
      site {
        name
      }
      logsheet_date
    }
  }`;

class _LogsheetViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        };
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch (sites, dates){
        
        let query = {}
        query.query = Logsheets
        if(dates.startDate && dates.endDate) {
            query.variables = {
                variables: {
                    sitename: sites,
                    startDate: new Date(dates.startDate),
                    endDate: new Date(dates.endDate)
                }
            }
        } else {
            query.variables = {
                variables: {
                    sitename: sites
                }
            }
        }

        let result = this.props.client.query(query)

        console.log(result)
        
    }

    render() {
        return (
            <div id='filter'  style={{ display: 'flex', flexDirection: 'column' }}>
                <Filter handleSearch={this.handleSearch} />
                <SearchResults />
            </div>
        );
    }
}

export default withApollo(_LogsheetViewer);