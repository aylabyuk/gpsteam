import React, { Component, PropTypes } from 'react';
import {fetchReceivers, fetchAntennas, fetchSiteContacts} from '../m/m.js'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//components
import DateFields from './DateFields'
import SiteFields from './SiteFields'
import HardwareFields from './HardwareFields'
import MeasurementFields from './MeasurementFields'
import TimeFields from './TimeFields'
import StatusFields from './StatusFields'
import AntennaHeigtInfoFields from './AntennaHeightInfoFields'
import PertinentInfoFields from './PertinentInfoFields'
import SiteContactPersonFields from './SiteContactPersonFields'

//ui
import { Paper, AppBar, Divider } from 'material-ui'

const LogSheetQuery = gql`query LogSheetQuery {
  allSitename {
    site_name
  }
  allReceiver {
    serial_number
  }
  allAntenna {
    serial_number
  }
}`;

const style = {
  margin: 20,
  display: 'inline-block',
  padding: 10,
  maxWidth: 800
};

class LogSheetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: fetchSiteContacts()
        };
    }

    render() {
        return (
            <Paper style={style} zDepth={1}>
                <AppBar
                    title="Log Sheet"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <DateFields />
                <SiteFields siteNames={this.props.data.allSitename ? this.props.data.allSitename : [{site_name: 'loading..'}]}/>
                <HardwareFields receivers={this.props.data.allReceiver ? this.props.data.allReceiver : [{serial_number: 'loading..'}]} 
                        antennas={this.props.data.allAntenna ? this.props.data.allAntenna : [{serial_number: 'loading..'}]} />
                <MeasurementFields />
                <TimeFields />
                <StatusFields />
                <AntennaHeigtInfoFields />
                <PertinentInfoFields />
                <SiteContactPersonFields contacts={this.state.contacts}/>
                
            </Paper>
        );
    }
}

LogSheetForm.propTypes = {
    loading: React.PropTypes.bool,
    data: PropTypes.shape({
        allSitename: PropTypes.array,
        allReceiver: PropTypes.array,
        allAntenna: PropTypes.array
    }).isRequired,
};

export default graphql(LogSheetQuery)(LogSheetForm)  

