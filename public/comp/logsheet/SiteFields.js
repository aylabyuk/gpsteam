import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { normalizeUpperCase } from '../formValidators/formValidators'


//ui
import { AutoComplete, MenuItem, TextField, FlatButton } from 'material-ui'


// this is the autocomplete field with the array of sitenames as datasource
const renderAutoCompleteField = ({ input, ref, label, dataSource, disabled, meta: { touched, error } }) => (
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
      disabled={disabled}
    />
)

const renderTextField = ({fullWidth, input, label, disabled, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={fullWidth}
    disabled={disabled}
  />
)

// three fields are rendered in this component ( sitename, marker and location )
class SiteFields extends PureComponent {
    render() {
        return (
            <form>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Site</h5>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <div style={{flex: '1 1'}}><Field disabled={this.props.ro} style={{flex: '1 1'}} name="sitename" component={renderAutoCompleteField}  dataSource={this.props.siteNames.map((a) => { return a.name })} normalize={normalizeUpperCase}/></div>
                    <div style={{flex: '1 1'}}><Field disabled={this.props.ro} style={{flex: '1 1'}} name="marker" component={renderTextField} label='marker' /></div>
                    <div style={{flex: '1 1'}} />
                </div>
                <Field name="location" disabled={this.props.ro} fullWidth={true} component={renderTextField} label='location' />
            </form>
        );
    }
}



export default SiteFields