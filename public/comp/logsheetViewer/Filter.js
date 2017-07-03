import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleLogsheetViewerDrawer } from '../../actions/index'
import MyRangePicker from '../../../packages/myflatpickr/myflatpickr'

// ui
import { AppBar, Paper, Card, AutoComplete, LinearProgress, TextField, RaisedButton, IconButton } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import NavigationClose  from 'material-ui/svg-icons/navigation/close';

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
      floatingLabelFixed
    />
)

const renderTextField = ({ input, value, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    floatingLabelFixed
  />
)
const renderDatePicker = ({ input, fullWidth, label, defaultValue, meta: { touched, error } }) => (
    <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
        { window.node.value ? <div style={{position: 'absolute', right: 12, top: 25, width: 20, height: 20}}>
            <IconButton tooltip="clear" tooltipPosition="top-center" >
                <Clear />
            </IconButton>
        </div>: null }
        <MyRangePicker floatingLabelText={label} fullWidth={fullWidth} options={{ mode: 'range' }} />
    </div>
)

class Filter extends Component {

  render() {
    let { loading, allSite, allReceiver, allAntenna } = this.props.data

    window.node = {}
    window.node.value = null

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
                  <Field name='daterange' component={renderDatePicker} label='dates' fullWidth={true} />
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