import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { fetchReceiverInfo } from '../m/m.js'
import { connect } from 'react-redux'
import { getReceiverInfo, getAntennaInfo } from '../../actions/index'

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
        maxSearchResults={10}
        openOnFocus={false}
    />
)

class HardwareFields extends Component {

   componentDidUpdate() {
       this.props.receiverSN ? this.props.getReceiverInfo(this.props.receiverSN) : ''
       this.props.antennaSN ? this.props.getAntennaInfo(this.props.antennaSN) : ''
       
   }

   render() {
        return (
            <form>
                <Field name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={this.props.receiverSNs}/>
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='receiver type' value={this.props.receiverType} disabled={true} />
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={this.props.partNumber} disabled={true} /><br/>
                <Field name="antennaSN" label='antenna serial number' component={renderAutoCompleteField}  dataSource={this.props.antennaSNs}/>
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='antenna type' value={this.props.antennaType} disabled={true} />
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={this.props.antennaPartNumber} disabled={true} /><br/>
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
        receiverType: state.serverData.receiverInfo && state.form.logsheet.values.receiverSN ? state.serverData.receiverInfo.receiver_type : '',
        partNumber: state.serverData.receiverInfo && state.form.logsheet.values.receiverSN ? state.serverData.receiverInfo.part_number : '',

        antennaSN: state.form.logsheet.values ? state.form.logsheet.values.antennaSN : '',
        antennaType: state.serverData.antennaInfo && state.form.logsheet.values.antennaSN ? state.serverData.antennaInfo.antenna_type : '',
        antennaPartNumber: state.serverData.antennaInfo && state.form.logsheet.values.antennaSN ? state.serverData.antennaInfo.antenna_partnumber : '',
	 }
}

export default connect(mapStateToProps, { getReceiverInfo, getAntennaInfo } )(form(HardwareFields))  