import React, {Component} from 'react';
import TimeSeries from './TimeSeries'
import { BUCA } from './m/BUCA'

/*
mock = BUCA
mock2 = ALAB
mock3 = 
ANGT
*/

import styles from '../css/chart.css';

class TimeSeriesContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(prevProps, prevState) {
       
    }
    
    render() {
        return (
            <div className={styles.timeSeriesContainer}>
                <TimeSeries data={this.props.data} name='east' styles={styles}/>
                {/*<TimeSeries data={this.props.data} name='north' styles={styles}/>
                <TimeSeries data={this.props.data} name='up' styles={styles}/>*/}
            </div>
        );
    }
}

export default TimeSeriesContainer;