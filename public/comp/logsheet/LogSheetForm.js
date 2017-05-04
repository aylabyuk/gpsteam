import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//components
import DateFields from './DateFields'
import ObserversFields from './ObserversFields'
import SiteFields from './SiteFields'
import HardwareFields from './HardwareFields'
import MeasurementFields from './MeasurementFields'
import TimeFields from './TimeFields'
import StatusFields from './StatusFields'
import AntennaHeigtInfoFields from './AntennaHeightInfoFields'
import PertinentInfoFields from './PertinentInfoFields'
import SiteContactPersonFields from './SiteContactPersonFields'
import LogSheetButtons from './LogSheetButtons'


//ui
import { Paper, Divider, LinearProgress } from 'material-ui';
import styles from '../../css/home.css';

const LogSheetQuery = gql`query LogSheetQuery {
  allSitename {
    id
    site_name
  }
  allReceiver {
    serial_number
  }
  allAntenna {
    serial_number
  }
}`;

class LogSheetForm extends Component {
    render() {
        let { loading, allSitename, allReceiver, allAntenna } = this.props.data

        if(loading) {
            return <LinearProgress mode="indeterminate" />
        } else {
            return (
                <div>
                    <DateFields />
                    <ObserversFields />
                    <SiteFields siteNames={allSitename ? allSitename : [{site_name: 'loading..'}]}/>
                    <HardwareFields receivers={allReceiver ? allReceiver : [{serial_number: 'loading..'}]} 
                            antennas={allAntenna ? allAntenna : [{serial_number: 'loading..'}]} />
                    <MeasurementFields />
                    <TimeFields />
                    <StatusFields />
                    <AntennaHeigtInfoFields />
                    <PertinentInfoFields />
                    <SiteContactPersonFields contactId={this.props.contactId} change={this.props.change}/>
                    <Divider />
                    <br />
                    <LogSheetButtons siteNames={allSitename} contactId={this.props.contactId} handleSubmit={this.props.handleSubmit}/>
                </div>
            );
        }
    }
}

const form =  reduxForm({  
	form: 'logsheet'
})

function mapStateToProps(state) {  
	return {
		contactId: state.ui.selectedContactId
	}
}

export default connect(mapStateToProps)(graphql(LogSheetQuery)(form(LogSheetForm)))
