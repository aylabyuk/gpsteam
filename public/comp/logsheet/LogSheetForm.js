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

        if(loading) {
            return <LinearProgress mode="indeterminate" />
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
	return {
		selectedContact: state.ui.selectedContact,
        initialValues: {
            startTime: new Date(null,null,null,0,0,0,0),
            endTime: new Date(null,null,null,23,59,0,0)
        }
	}
}

export default connect(mapStateToProps)(graphql(LogSheetQuery)(form(LogSheetForm)))
