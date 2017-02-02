import React, {Component} from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'
import { Button, Card } from 'semantic-ui-react'

class TimeSeries extends Component {
  constructor(props) {
        super(props);
    }

    render() {

        let newData = [], date, yVal
        this.props.data.map((d) => {
            date = d.date
            switch (this.props.name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            newData.push({date, yVal, name: this.props.name})
        })


        return (
            <Card raised style={{margin: 10, width: 626}}>
                <Card.Content>
                <Card.Header>
                        {this.props.name}
                </Card.Header>
                <Button id='resetBtn' size='mini' primary className={this.props.name}>reset</Button>
                    <Chart
                        id='chart'
                        type={"custom"}
                        customChart={MyCustomChart}
                        data={newData}
                        styles={this.props.styles}
                    />
                </Card.Content>
            </Card>
        );
    }
}

export default TimeSeries;