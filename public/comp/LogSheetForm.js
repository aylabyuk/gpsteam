import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

//ui
import { DatePicker } from 'material-ui'


const form = reduxForm({
  form: 'logsheet'
})

class LogSheetForm extends Component {
    render() {
        return (
            <form>
                <Field name='date' component={DatePicker} hintText="Reporting Date" mode="landscape" 
                    formatDate={new Intl.DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }).format}/>
            </form>
        );
    }
}


function mapStateToProps(state) {  
	return {
		
	}
}

export default connect(mapStateToProps)(form(LogSheetForm))  