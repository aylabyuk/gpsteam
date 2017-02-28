import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

//ui
import { AutoComplete, MenuItem, TextField, FlatButton } from 'material-ui'

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

class SiteFields extends Component {
    render() {
        return (
            <form>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Site Information</h5>
                <Field name="sitename" component={renderAutoCompleteField}  dataSource={this.props.siteNames.map((a) => { return a.site_name })}/>
                <Field name="location" style={{ marginLeft: 5}}  component={renderTextField} label='location' />
                <Field name="marker" style={{ marginLeft: 5}}  component={renderTextField} label='marker' />
            </form>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})



export default form(SiteFields)