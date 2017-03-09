import React, { Component, PropTypes } from 'react';
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
import { Paper, AppBar, RaisedButton, Divider } from 'material-ui';

import styles from '../../css/home.css';

const style = {
  margin: 20,
  display: 'inline-block',
  padding: 10,
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column'
};

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

class LogSheetForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { loading, allSitename, allReceiver, allAntenna } = this.props.data

        if(loading) {
            return <div>loading..</div>
        } else {
            return (
                <Paper style={style} zDepth={1}>
                    <AppBar
                        title="Log Sheet"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                    <DateFields />
                    <SiteFields siteNames={allSitename ? allSitename : [{site_name: 'loading..'}]}/>
                    <HardwareFields receivers={allReceiver ? allReceiver : [{serial_number: 'loading..'}]} 
                            antennas={allAntenna ? allAntenna : [{serial_number: 'loading..'}]} />
                    <MeasurementFields />
                    <TimeFields />
                    <StatusFields />
                    <AntennaHeigtInfoFields />
                    <PertinentInfoFields />
                    <SiteContactPersonFields />
                    <Divider />
                    <br />
                    <RaisedButton label='submit' primary />
                </Paper>
            );
        }
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
