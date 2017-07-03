import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleLogsheetViewerDrawer } from '../../actions/index'

// ui
import { AppBar, Paper, Card, AutoComplete, LinearProgress, TextField, RaisedButton, IconButton, Popover } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import { DateRange } from 'react-date-range'


const LogSheetQuery = gql`query LogSheetQuery {
  allSite {
    id
    name
  }
  allReceiver {
    serial_number
  }
  allAntenna {
    serial_number
  }
}`;

const renderAutoCompleteField = ({ input, fullWidth, label, dataSource, meta: { touched, error } }) => (
  <AutoComplete
      floatingLabelText="site name"
      filter={AutoComplete.fuzzyFilter}
      openOnFocus={true}
      dataSource={dataSource}
      listStyle={{ maxHeight: 200, overflow: 'auto' }}
      onUpdateInput={input.onChange}
      searchText={input.value}
      openOnFocus={false}
      maxSearchResults={20}
      errorText={touched && error}
      fullWidth={fullWidth}
    />
)

const renderTextField = ({ input, value, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSelect(range){
        console.log(range);
        // An object with two keys, 
        // 'startDate' and 'endDate' which are Momentjs objects. 
    }

  render() {
    let { loading, allSite, allReceiver, allAntenna } = this.props.data
      if(loading) {
        return <LinearProgress mode="indeterminate" />
      } else {
        return (
          <div>
              <AppBar title='Search Logsheets' iconElementRight={ <IconButton onTouchTap={()=> this.props.toggleLogsheetViewerDrawer()}><NavigationClose /></IconButton> }/>
              <div style={{ margin: '10px' }}>
                  <Field name="sitename" fullWidth={true} component={renderAutoCompleteField}  dataSource={allSite.map((s) => { return s.name })}
                    normalize={normalizeUpperCase}/>
                  <Field name="location" onChange={null} fullWidth={true} component={renderTextField} label='location' />
                  <TextField name='daterange' onFocus={this.handleTouchTap} fullWidth={true} label='date/s' />
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <DateRange calendars={2} rangedCalendars={true} onInit={this.handleSelect}
                        onChange={this.handleSelect}/>
                  </Popover >
              </div>
              <RaisedButton primary  label='search' fullWidth={true} />
          </div>
        );
      }
      
  }
}

const form =  reduxForm({  
	form: 'searchLogsheet'
})

export default connect(null, { toggleLogsheetViewerDrawer })(graphql(LogSheetQuery)(form(Filter)))