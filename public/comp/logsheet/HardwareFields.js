import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { fetchReceiverInfo } from '../m/m.js'
import { connect } from 'react-redux'
import { getReceiverInfo } from '../../actions/index'

//ui
import { AutoComplete, TextField } from 'material-ui'


const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
    <AutoComplete
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        openOnFocus={true}
        dataSource={dataSource}
        listStyle={{ maxHeight: 200, overflow: 'auto' }}
        onUpdateInput={input.onChange}
        searchText={input.value}
    />
)

class HardwareFields extends Component {

   componentDidUpdate() {
       this.props.getReceiverInfo(this.props.receiverSN)
   }

   render() {
        return (
            <form>
                <Field name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={this.props.receiverSNs}/>
                <TextField  style={{ marginLeft: 5}} floatingLabelText='receiver type' value={this.props.receiverType} disabled={true} />
                <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={this.props.partNumber} disabled={true} />
            </form>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

function mapStateToProps(state) {  
	return {
	 	receiverSN: state.form.logsheet.values ? state.form.logsheet.values.receiverSN : '',
        receiverType: state.serverData.receiverInfo ? state.serverData.receiverInfo.receiver_type : '',
        partNumber: state.serverData.receiverInfo ? state.serverData.receiverInfo.part_number : ''
	 }
}

export default connect(mapStateToProps, { getReceiverInfo } )(form(HardwareFields))  