import React, { PureComponent } from 'react';
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

//ui
import { AutoComplete, TextField } from 'material-ui'


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


///Get receiver information

class ReceiverInfo extends PureComponent {
    render() {
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

const CurrentSelectedReceiver = gql`
  query CurrentSelectedReceiver($serial_number: String!) {
    Receiver(serial_number: $serial_number) {
        type
        part_number
    }
  }
`;

const ReceiverInfoWithData = graphql(CurrentSelectedReceiver, {
   options: ({ serial_number }) => ({ variables: { serial_number } }),
})(ReceiverInfo);

///Get antenna information

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

const CurrentSelectedAntenna = gql`
  query CurrentSelectedAntenna($serial_number: String!) {
    Antenna(serial_number: $serial_number) {
        type
        part_number
    }
  }
`;

const AntennaInfoWithData = graphql(CurrentSelectedAntenna, {
   options: ({ serial_number }) => ({ variables: { serial_number } }),
})(AntennaInfo);


//hardware fields component

class HardwareFields extends PureComponent {
   render() {
        let receivers_SNs = this.props.receivers.map((a) => { return a.serial_number }),
            antennas_SNs = this.props.antennas.map((a) => { return a.serial_number })

        let recIn = this.props.receivers.map((a) => { return a.serial_number }).includes(this.props.receiverSN),
            antIn = this.props.antennas.map((a) => { return a.serial_number }).includes(this.props.antennaSN)

        return (
            <form>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Instruments</h5>
                <ReceiverInfoWithData ro={this.props.ro} serial_number={recIn ? this.props.receiverSN : ''} datasource={receivers_SNs}/>
                <AntennaInfoWithData ro={this.props.ro} serial_number={antIn ? this.props.antennaSN : ''} datasource={antennas_SNs}/>
            </form>
        );
    }
}

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

