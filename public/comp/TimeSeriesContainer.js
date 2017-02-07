import React, {Component} from 'react';
import TimeSeries from './TimeSeries'
import { BUCA } from './m/BUCA'

import axios from 'axios';
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

    
    render() {

       axios.get('/compute' , {
            params: {
                data: this.props.data
            }
       })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        return (
            <div className={styles.timeSeriesContainer}>
                <TimeSeries data={this.props.data} name='east' styles={styles}/>
                <TimeSeries data={this.props.data} name='north' styles={styles}/>
                <TimeSeries data={this.props.data} name='up' styles={styles}/>
            </div>
        );
    }
}

export default TimeSeriesContainer;