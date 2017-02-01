import React, {Component} from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'


class TimeSeries extends Component {
  constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{margin: 10}}>
                <h2>{this.props.name}</h2>
                <button>RESET</button>
                <Chart
                    id='chart'
                    type={"custom"}
                    customChart={MyCustomChart}
                    data={this.props.data}
                />
            </div>
        );
    }
}

export default TimeSeries;