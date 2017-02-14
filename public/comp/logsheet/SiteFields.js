import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

//ui
import { AutoComplete, MenuItem } from 'material-ui'

const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
  <AutoComplete
      floatingLabelText="site name"
      filter={AutoComplete.caseInsensitiveFilter}
      openOnFocus={true}
      dataSource={dataSource}
      listStyle={{ maxHeight: 200, overflow: 'auto' }}
      onUpdateInput={input.onChange}
      searchText={input.value}
    />
)

const form =  reduxForm({  
	form: 'logsheet'
})

class SiteFields extends Component {
    render() {
        return (
            <form>
                <Field name="sitename" component={renderAutoCompleteField}  dataSource={this.props.sites}/>
            </form>
        );
    }
}

function mapStateToProps(state) {  

    let siteName = []
    state.serverData.sites.map((d) => {
        siteName.push(d.site_name)
    })

	return {
		sites: siteName
	}
}

export default connect(mapStateToProps)(form(SiteFields))  