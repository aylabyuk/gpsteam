import React, {Component} from 'react';
import TimeSeries from './TimeSeries'
import { data } from './m/mock'

import styles from '../css/chart.css';

class TimeSeriesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data
        };
    }

    render() {
        return (
            <div className={styles.timeSeriesContainer}>
                <TimeSeries data={this.state.data} name='east' styles={styles}/>
                <TimeSeries data={this.state.data} name='north' styles={styles}/>
                <TimeSeries data={this.state.data} name='up' styles={styles}/>
            </div>
        );
    }
}

export default TimeSeriesContainer;