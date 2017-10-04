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
            results: null
        };
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch  (sites, dates){

        // prevent bugs on empty requests
        if(sites == undefined && !dates.startDate) {
            return null
        } else {
            if(Array.isArray(sites)) {
                if(sites.length === 0) {
                    sites = undefined
                }
            }
        }

        console.log(sites, dates)
        
        let query = {}
        query.query = Logsheets
        if(dates.startDate && dates.endDate) {
            query.variables = {
                sitename: sites,
                startDate: new Date(dates.startDate),
                endDate: new Date(dates.endDate)
            }
        } else if(sites == undefined) {
            query.variables = {
                sitename: []
            }
        } else {
            query.variables = {
                sitename: sites
            }
        }

        this.props.client.query(query).then((res) => {
            this.setState({ results: res  })
        }).catch((err) =>{
            console.log(err)
        })
        
    }

    render() {
        return (
            <div id='filter'  style={{ display: 'flex', flexDirection: 'row' }}>
                <Filter handleSearch={this.handleSearch} />
                <SearchResults results={this.state.results}/>
            </div>
        );
    }
}

export default withApollo(_LogsheetViewer);