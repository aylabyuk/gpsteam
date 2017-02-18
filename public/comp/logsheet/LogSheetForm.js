import React, { Component } from 'react';
import {fetchSites, fetchReceivers, fetchAntennas} from '../m/m.js'

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
            antennas: fetchAntennas()
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
                <SiteFields siteNames={this.state.siteNames}/>
                <HardwareFields receiverSNs={this.state.receivers} antennaSNs={this.state.antennas} />
                <MeasurementFields />
                <TimeFields />
                <StatusFields />
                <AntennaHeigtInfoFields />
                <PertinentInfoFields />
                <SiteContactPersonFields />
                
            </Paper>
        );
    }
}

export default LogSheetForm  