import React, { Component, PropTypes } from 'react';
import {fetchSites, fetchReceivers, fetchAntennas, fetchSiteContacts} from '../m/m.js'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

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

const MyQuery = gql`query MyQuery {
  allSitename {
    site_name
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
            siteNames: fetchSites(),
            receivers: fetchReceivers(),
            antennas: fetchAntennas(),
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
                <SiteFields siteNames={!this.props.loading ? this.props.data.allSitename.valueOf(): this.state.siteNames}/>
                <HardwareFields receiverSNs={this.state.receivers} antennaSNs={this.state.antennas} />
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
    }).isRequired,
};

export default graphql(MyQuery)(LogSheetForm)  