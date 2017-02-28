import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
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


///Get receiver information

class ReceiverInfo extends Component {
    render() {
        const { Receiver } = this.props.data
        return(
            <div>
                <Field name="receiverSN" label='receiver serial number' component={renderAutoCompleteField}  dataSource={this.props.datasource} />
                <TextField  style={{ marginLeft: 5}} floatingLabelText='receiver type' value={Receiver == null ? '' : Receiver.type}  disabled={true} />
                <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={Receiver == null ? '' : Receiver.part_number} disabled={true} /><br/>
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

class AntennaInfo extends Component {
    render() {
        const { Antenna } = this.props.data
        return(
            <div>
                <Field name="antennaSN" label='antenna serial number' component={renderAutoCompleteField}  dataSource={this.props.datasource}/>
                <TextField  style={{ marginLeft: 5}} floatingLabelText='antenna type' value={Antenna == null ? '' : Antenna.type}  disabled={true} />
                <TextField  style={{ marginLeft: 5}} floatingLabelText='part number' value={Antenna == null ? '' : Antenna.part_number} disabled={true} /><br/>
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

class HardwareFields extends Component {
   render() {
        let receivers_SNs = this.props.receivers.map((a) => { return a.serial_number }),
            antennas_SNs = this.props.antennas.map((a) => { return a.serial_number })

        let recIn = this.props.receivers.map((a) => { return a.serial_number }).includes(this.props.receiverSN),
            antIn = this.props.antennas.map((a) => { return a.serial_number }).includes(this.props.antennaSN)

        return (
            <form>
                <ReceiverInfoWithData serial_number={recIn ? this.props.receiverSN : ''} datasource={receivers_SNs}/>
                <AntennaInfoWithData serial_number={antIn ? this.props.antennaSN : ''} datasource={antennas_SNs}/>
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

export default (form(HardwareFields))

