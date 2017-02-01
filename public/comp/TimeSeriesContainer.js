import React, {Component} from 'react';
import TimeSeries from './TimeSeries'
import { data } from './m/mock'

class TimeSeriesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data
        };
    }

    render() {
        return (
            <div>
                <TimeSeries data={this.state.data} name='east'/>
                <TimeSeries data={this.state.data} name='north'/>
                <TimeSeries data={this.state.data} name='up'/>
            </div>
        );
    }
}

export default TimeSeriesContainer;