import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm  } from 'redux-form'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleSearchLogsheet, setSearchLogsheetsDates, setSearchLogsheetsSites } from '../../actions/index'

// ui
import { AppBar, Paper, Card, LinearProgress, TextField, FlatButton, IconButton } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import DatepickerComponent from './DatepickerComponent'
import SitesChips from './SitesChips'

const LogSheetQuery = gql`query LogSheetQuery {
  allSite {
    id
    name
  }
}`;

class Filter extends Component {
  
  render() {
    let { loading, allSite } = this.props.data
      if(loading) {
        return <LinearProgress mode="indeterminate" />
      } else {
        return (
          <Paper style={{ marginBottom: '10px', padding: '0px 10px 10px 10px', width: '800px',  maxWidth: '800px' }}>
                <SitesChips allSite={allSite} setSearchLogsheetsSites={this.props.setSearchLogsheetsSites} searchLogsheets={this.props.searchLogsheetsSites}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                <DatepickerComponent setSearchLogsheetsDates={this.props.setSearchLogsheetsDates} searchLogsheetsDates={this.props.searchLogsheetsDates}/>
                <FlatButton onTouchTap={() => this.handleSearch()}  secondary icon={<ActionSearch />}  label='search' />
              </div>
          </Paper>
              
        );
      }
      
  }
}

const form =  reduxForm({  
	form: 'searchLogsheets'
})

export default connect(null, { toggleSearchLogsheet  })(graphql(LogSheetQuery)(form(Filter)))