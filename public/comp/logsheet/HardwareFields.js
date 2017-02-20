import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { fetchReceiverInfo } from '../m/m.js'
import { connect } from 'react-redux'
import { getReceiverInfo, getAntennaInfo, clearAntennaInfo, clearReceiverInfo } from '../../actions/index'

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


let recIn, antIn

class HardwareFields extends Component {

   componentDidUpdate() {
        recIn = this.props.receiverSNs.includes(this.props.receiverSN)
        antIn = this.props.antennaSNs.includes(this.props.antennaSN)

        if(!recIn) {
            this.props.clearReceiverInfo()
        } else {
            this.props.getReceiverInfo(this.props.receiverSN)
        }

        if(!antIn) {
            this.props.clearAntennaInfo()
        } else {
            this.props.getAntennaInfo(this.props.antennaSN)
        }
   }

   render() {
        return (
            <form>
                <Field name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={this.props.receiverSNs} />
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='receiver type' value={this.props.receiverSN ? this.props.receiverType: ''} disabled={true} />
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={this.props.receiverSN ? this.props.partNumber: ''} disabled={true} /><br/>
                <Field name="antennaSN" label='antenna serial number' component={renderAutoCompleteField}  dataSource={this.props.antennaSNs}/>
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='antenna type' value={this.props.antennaSN ? this.props.antennaType: ''} disabled={true} />
                    <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={this.props.antennaSN ? this.props.antennaPartNumber: ''} disabled={true} /><br/>
            </form>
        );
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

const selector = formValueSelector('logsheet') 
HardwareFields = connect(
  state => {
    const receiverSN = selector(state, 'receiverSN')
    const antennaSN = selector(state, 'antennaSN')
    return {
      receiverSN,
      antennaSN
    }
  }
)(HardwareFields)

function mapStateToProps(state) {  
	return {
        receiverType: state.serverData.receiverInfo.receiver_type,
        partNumber: state.serverData.receiverInfo.part_number,

        antennaType: state.serverData.antennaInfo.antenna_type,
        antennaPartNumber: state.serverData.antennaInfo.antenna_partnumber

	 }
}

export default connect(mapStateToProps, 
    { getReceiverInfo, getAntennaInfo, clearAntennaInfo, clearReceiverInfo }
)(form(HardwareFields))  