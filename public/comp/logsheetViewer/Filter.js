import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleLogsheetViewerDrawer } from '../../actions/index'
import MyRangePicker from '../../../packages/myflatpickr/myflatpickr'

// ui
import { AppBar, IconButton, Paper, Card, AutoComplete, LinearProgress, TextField, RaisedButton, DatePicker } from 'material-ui' 
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
const renderDatePicker = ({ input, fullWidth, label, defaultValue, meta: { touched, error } }) => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
    <DatePicker 
        mode='portrait'
        container="inline"
        errorText = {touched && error} 
        {...input}
        value = { input.value !== ''? new Date(input.value): null}
        formatDate={new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
        }).format }
        autoOk={true}
        hintText={label}
        floatingLabelText={label}
        onChange = {(event, value) => {input.onChange(value)} } 
        onBlur = {(value) => { value = '' }}
        fullWidth={fullWidth}
        maxDate={new Date()}/>
    </div>
)

class Filter extends Component {

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
                    <MyRangePicker floatingLabelText='dates' fullWidth={true} options={{ mode: 'range' }} />
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