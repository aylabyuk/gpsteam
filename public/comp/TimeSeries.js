import React, {Component} from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'
import { data } from './m/mock'


class TimeSeries extends Component {
  constructor(props) {
        super(props);

        this.state = {
            data: data
        };
    }

    render() {
        return (
            <div style={{margin: 10}}>
                <h2>Custom Chart</h2>
                <button>RESET</button>
                <Chart
                    type={"custom"}
                    customChart={MyCustomChart}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default TimeSeries;