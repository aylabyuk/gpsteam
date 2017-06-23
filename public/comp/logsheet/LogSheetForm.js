import React, { PureComponent, PropTypes } from 'react';
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

//validation 
import { validateLogsheet as validate } from '../formValidators/formValidators'


//ui
import { Paper, Divider, LinearProgress } from 'material-ui';
import styles from '../../css/home.css';

const LogSheetQuery = gql`query LogSheetQuery {
  allSite {
    id
    name
  }
  allReceiver {
    serial_number
  }
  allAntenna {
    serial_number
  }
}`;


class LogSheetForm extends PureComponent {

    render() {
        let { loading, allSite, allReceiver, allAntenna } = this.props.data
        let { logsheetToReview } = this.props

        if(loading) {
            return (
                <div style={{width: '500px', paddingTop: '5px'}}>
                    <LinearProgress mode="indeterminate" />
                </div>
            );
        } else {
            return (
                <div>
                    <DateFields />
                    <ObserversFields />
                    <SiteFields siteNames={allSite ? allSite : [{name: 'loading..'}]}/>
                    <HardwareFields receivers={allReceiver ? allReceiver : [{serial_number: 'loading..'}]} 
                            antennas={allAntenna ? allAntenna : [{serial_number: 'loading..'}]} />
                    <MeasurementFields />
                    <TimeFields />
                    <StatusFields />
                    <AntennaHeigtInfoFields />
                    <PertinentInfoFields />
                    <SiteContactPersonFields selectedContact={this.props.selectedContact} change={this.props.change}/>
                    <Divider />
                    <br />
                    <LogSheetButtons siteNames={allSite} selectedContact={this.props.selectedContact} handleSubmit={this.props.handleSubmit}/>
                </div>
            );
        }
    }
}

const form =  reduxForm({  
	form: 'logsheet',
    validate
})

function mapStateToProps(state) {  

    let { logsheetToReview } = state.ui
    let l = logsheetToReview

    const toReview = l ? {
        logdate: new Date(l.logsheet_date),
        sitename: l.site.name,
        marker: l.marker,
        location: l.location,
        receiverSN: l.receiver.serial_number,
        antennaSN: l.antenna.serial_number,
        north: l.north,
        east: l.east,
        south: l.south,
        west: l.west,
        azimuth: l.azimuth,
        startTime: l.time_start,
        endTime: l.time_end,
        failureTime: l.failure_time,
        receiverStatus: l.receiver_status,
        antennaStatus: l.antenna_status,
        rodNo: l.rod_num,
        rodCorrection: l.rod_correction,
        ipAddress: l.ip_add,
        netmask: l.netmask,
        gateway: l.gateway,
        dns: l.dns,
        localTcpPort: l.local_tcp_port,
        lat: l.latitude,
        long: l.longitude,
        unusualAbnormalObservation: l.observed_situation,
        lodgingOrRoadInfo: l.lodging_road_information,
        pertinentInfo: l.others,
        // contactFirstName: l.contact.first_name,
        // contactLastName: l.contact.last_name,
        // contactNumber: l.contact.number
    } : null

	return {
		selectedContact: state.ui.selectedContact,
        logsheetToReview: state.ui.logsheetToReview,

        // if logsheetToReview has value set initial values of fields
        initialValues: toReview
	}
}

export default connect(mapStateToProps)(graphql(LogSheetQuery)(form(LogSheetForm)))
