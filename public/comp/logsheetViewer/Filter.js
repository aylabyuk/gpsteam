import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector  } from 'redux-form'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleSearchLogsheet, setDateRangeValues} from '../../actions/index'

// ui
import { AppBar, Paper, Card, LinearProgress, TextField, FlatButton, IconButton } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import DatepickerComponent from './DatepickerComponent'
import SitesChips from './SitesChips'

const Sites = gql`query SitesQuery {
  allSite {
    name
  }
}`;

class Filter extends Component {
  render() {
    let { loading, allSite } = this.props.data
    let { sites, startDate, endDate } = this.props
      if(loading) {
        return <LinearProgress mode="indeterminate" />
      } else {
        return (
          <Paper style={{ marginBottom: '10px', padding: '0px 10px 10px 10px', width: '800px',  maxWidth: '800px' }}>
                <SitesChips allSite={allSite} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                <DatepickerComponent setDateRangeValues={this.props.setDateRangeValues}/>
                <FlatButton onTouchTap={() => this.props.handleSearch(sites, { startDate, endDate })}  secondary icon={<ActionSearch />}  label='search' />
              </div>
          </Paper>
              
        );
      }
      
  }
}

const form =  reduxForm({  
	form: 'searchLogsheets'
})

const selector = formValueSelector('searchLogsheets')

function mapStateToProps(state) {  
	return {
    sites: selector(state, 'sites'),
    startDate: state.ui.dateRangeValues ? state.ui.dateRangeValues.startDate : null,
    endDate: state.ui.dateRangeValues ? state.ui.dateRangeValues.endDate: null
	}
}

const FilterSitesWithData = graphql(Sites)(form(Filter))
export default connect(mapStateToProps, { toggleSearchLogsheet, setDateRangeValues })(FilterSitesWithData)