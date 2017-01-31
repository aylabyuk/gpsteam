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
            </div>
        );
    }
}

export default TimeSeriesContainer;