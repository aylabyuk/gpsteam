import React, {Component} from 'react';
import { connect } from 'react-redux'; 
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'
import { Button, Card } from 'semantic-ui-react'

class TimeSeries extends Component {
  constructor(props) {
        super(props);

    }

    render() {
        let dd = [], date, yVal
        this.props.data.map((d) => {
            date = d.date
            switch (this.props.name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            dd.push({date, yVal, name: this.props.name})
        })

        return (
            <Card raised style={{ width: 626}}>
                <Card.Content>
                <Card.Header>
                        {this.props.name}
                </Card.Header>
                <div>velocity: {this.props.computed ? this.props.computed.velocity[this.props.name][1] * 10 : 'calculating'}</div>
                <div>error: +- {this.props.computed ? this.props.computed.std_error[this.props.name][0] : 'calculating'}</div>
                <Button id='resetBtn' size='mini' primary className={this.props.name}>reset</Button>
                    <Chart
                        id='chart'
                        type={"custom"}
                        customChart={MyCustomChart}
                        data={dd}
                        styles={this.props.styles}
                    />
                </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps(state) {  
  return {
    computed: state.plot.computed
  };
}

export default connect(mapStateToProps)(TimeSeries);