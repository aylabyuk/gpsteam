import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'

// ui
import { Paper, Card, AutoComplete, LinearProgress, TextField, RaisedButton, DatePicker } from 'material-ui' 

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

const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
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
    />
)

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
const renderDatePicker = ({ input, label, defaultValue, meta: { touched, error } }) => (
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
        hintText={label}
        floatingLabelText={label}
        onChange = {(event, value) => {input.onChange(value)} } 
        onBlur = {(value) => { value = '' }}
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
            <center>
            <Paper style={{margin: '80px', padding: '20px', width: '300px'}}>
                <span>Use this form to search for available logsheets</span>
                <br/>
                  <Field name="sitename" style={{flexGrow: 1}} component={renderAutoCompleteField}  dataSource={allSite.map((s) => { return s.name })}
                     normalize={normalizeUpperCase}/>
                  <Field name="location" style={{flexGrow: 1}} component={renderTextField} label='location' />
                  <Field name="startDate" label='date(from)' component={renderDatePicker} autoOk={false} />
                  <Field name="endDate" label='date(to)' component={renderDatePicker} autoOk={false} />
                <br />
                <br />
                <br />
                <RaisedButton primary label='search' fullWidth />
            </Paper>
            </center>
          );
        }
        
    }
}

const form =  reduxForm({  
	form: 'searchLogsheet'
})

export default graphql(LogSheetQuery)(form(Filter))