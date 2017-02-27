import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { fetchReceiverInfo } from '../m/m.js'
import { connect } from 'react-redux'
import { getAntennaInfo, clearAntennaInfo, clearReceiverInfo } from '../../actions/index'
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

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

class ReceiverInfo extends Component {
    render() {
        const { Receiver } = this.props.data
        return(
            <div>
                <TextField  style={{ marginLeft: 5}} floatingLabelText='receiver type' value={Receiver == null ? '' : Receiver.receiver_type}  disabled={true} />
                <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={Receiver == null ? '' : Receiver.part_number} disabled={true} /><br/>
            </div>
        )
    }
}

const CurrentSelectedReceiver = gql`
  query CurrentSelectedReceiver($serial_number: String!) {
    Receiver(serial_number: $serial_number) {
        receiver_type
        part_number
    }
  }
`;

const ReceiverInfoWithData = graphql(CurrentSelectedReceiver, {
   options: ({ serial_number }) => ({ variables: { serial_number } }),
})(ReceiverInfo);



class HardwareFields extends Component {

   componentDidUpdate() {
        recIn = this.props.receivers.map((a) => { return a.serial_number }).includes(this.props.receiverSN)
        antIn = this.props.antennas.map((a) => { return a.antenna_serialnumber }).includes(this.props.antennaSN)

        if(!recIn) {
            this.props.clearReceiverInfo()
        } else {
            //this.getReceiverInfo(this.props.receiverSN)
        }

        if(!antIn) {
            this.props.clearAntennaInfo()
        } else {
            this.props.getAntennaInfo(this.props.antennaSN)
        }
   }

   render() {
        let receivers_SNs = this.props.receivers.map((a) => { return a.serial_number }),
            antennas_SNs = this.props.antennas.map((a) => { return a.antenna_serialnumber })


        return (
            <form>
                <Field name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={receivers_SNs} />
                    <ReceiverInfoWithData serial_number={this.props.receiverSN ? this.props.receiverSN : '12345789'} />
                <Field name="antennaSN" label='antenna serial number' component={renderAutoCompleteField}  dataSource={antennas_SNs}/>
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
    { getAntennaInfo, clearAntennaInfo, clearReceiverInfo }
)(form(withApollo(HardwareFields)))

HardwareFields.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
}