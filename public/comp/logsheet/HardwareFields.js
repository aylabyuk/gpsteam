import React, { PureComponent } from 'react';
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

//ui
import { AutoComplete, TextField } from 'material-ui'

// renderAutoCompleteField will be used both for receiver and antenna fields
// caseInsensitiveFilter is used as a filter value for each dataset
const renderAutoCompleteField = ({ input, label, dataSource, disabled, meta: { touched, error } }) => (
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
        errorText={touched && error}
        disabled={disabled}
    />
)

// Receiver component contains three major fields (serial_number, receiver_type and part_number)
class ReceiverInfo extends PureComponent {
    render() {
        // receiver data are fetched by the parent component
        // the parent component will then provide this data to the child component (ReceiverInfo)
        const { Receiver } = this.props.data
        return(
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{flex: '1 1'}}><Field disabled={this.props.ro} style={{flexGrow: 1}} name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={this.props.datasource} /></div>
                <div style={{flex: '1 1'}}><TextField style={{flexGrow: 1}} floatingLabelText='receiver type' value={Receiver == null ? '' : Receiver.type}  disabled={true} /></div>
                <div style={{flex: '1 1'}}><TextField style={{flexGrow: 1}}  floatingLabelText='part number' value={Receiver == null ? '' : Receiver.part_number} disabled={true} /></div>
            </div>
        )
    }
}

// CurrentSelectedReceiver is a gql query that is used in querying receiver information of the currently typed receiver serial number 
// It requires serial_number in form of a string
// It returns the type and the part_number of the receiver
const CurrentSelectedReceiver = gql`
  query CurrentSelectedReceiver($serial_number: String!) {
    Receiver(serial_number: $serial_number) {
        type
        part_number
    }
  }
`;

// ReceiverInfoWithData contains the ReceiverInfo component with a Higher Order Component graphql supplied with the query variable (CurrentSelectedReceiver) 
// serial number of the selected receiver is the variable for this query
// when the user type the serial number of the receiver the receiver-related information is also requested to the server via graphql query asynchronously
const ReceiverInfoWithData = graphql(CurrentSelectedReceiver, {
   options: ({ serial_number }) => ({ variables: { serial_number } }),
})(ReceiverInfo);

// similar to the Receiver, Antenna component contains three major fields (serial_number, receiver_type and part_number)
class AntennaInfo extends PureComponent {
    render() {
        const { Antenna } = this.props.data
        return(
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{flex: '1 1'}}><Field disabled={this.props.ro} style={{flexGrow: 1}} name="antennaSN" label='antenna serial number' component={renderAutoCompleteField}  dataSource={this.props.datasource}/></div>
                <div style={{flex: '1 1'}}><TextField style={{flexGrow: 1}} floatingLabelText='antenna type' value={Antenna == null ? '' : Antenna.type}  disabled={true} /></div>
                <div style={{flex: '1 1'}}><TextField style={{flexGrow: 1}} floatingLabelText='part number' value={Antenna == null ? '' : Antenna.part_number} disabled={true} /></div>
            </div>
        )
    }
}

// CurrentSelectedAntenna is a gql query that is used in querying antenna information of the currently typed antenna serial number
// It requires serial_number in form of a string
// It returns the type and the part_number of the antenna
const CurrentSelectedAntenna = gql`
  query CurrentSelectedAntenna($serial_number: String!) {
    Antenna(serial_number: $serial_number) {
        type
        part_number
    }
  }
`;

// AntennaInfoWithData contains the AntennaInfo component with a Higher Order Component graphql supplied with the query variable (CurrentSelectedAntenna) 
// serial number of the selected receiver is the variable for this query
// when the user type the serial number of the antenna the other antenna-related information is also requested to the server via graphql query asynchronously
const AntennaInfoWithData = graphql(CurrentSelectedAntenna, {
   options: ({ serial_number }) => ({ variables: { serial_number } }),
})(AntennaInfo);


// hardware fields component 
// the main exported component for this module
class HardwareFields extends PureComponent {
   render() {

        // maps all the serial numbers and store it as an array in a variable
        let receivers_SNs = this.props.receivers.map((a) => { return a.serial_number }),
            antennas_SNs = this.props.antennas.map((a) => { return a.serial_number })

        // check if the typed serial numbers are present in the dataset of serial numbers
        let recIn = this.props.receivers.map((a) => { return a.serial_number }).includes(this.props.receiverSN),
            antIn = this.props.antennas.map((a) => { return a.serial_number }).includes(this.props.antennaSN)

        return (
            <form>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Instruments</h5>
                {/* both ReceiverInfoWithData and AntennaInfoWithData are used to create the hardware component
                    receiver and antenna serial numbers are supplied accordingly to each component using the datasource attribute  */}

                {/*
                    to prevent errors during execution of this code.. only provide the serial numbers as props to the rendered component
                    if recIN or antIn returns true 
                */}
                <ReceiverInfoWithData ro={this.props.ro} serial_number={recIn ? this.props.receiverSN : ''} datasource={receivers_SNs}/>
                <AntennaInfoWithData ro={this.props.ro} serial_number={antIn ? this.props.antennaSN : ''} datasource={antennas_SNs}/>
            </form>
        );
    }
}

// redux form provides a way for developers to extract values from the store through the formValueSelector
// an array of receiver and anttenna is returned and then we can now use this as props to the HardwareFields component
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

export default HardwareFields

