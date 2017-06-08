import React, { Component } from 'react'
import { Field } from 'redux-form'
import { normalizeUpperCase } from '../formValidators/formValidators'


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

class SiteFields extends Component {
    render() {
        return (
            <form>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Site</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Field name="sitename" style={{flexGrow: 1}} component={renderAutoCompleteField}  dataSource={this.props.siteNames.map((a) => { return a.site_name })} normalize={normalizeUpperCase}/>
                    <Field name="location" style={{flexGrow: 1}} component={renderTextField} label='location' />
                    <Field name="marker" style={{flexGrow: 1}} component={renderTextField} label='marker' />
                </div>
            </form>
        );
    }
}

export default SiteFields