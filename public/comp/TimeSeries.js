import React, {Component} from 'react';
import { connect } from 'react-redux'; 
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react'

class TimeSeries extends Component {
    render() {
        let { name, computed, data, styles } = this.props
        let dd = [], date, yVal, i = 0
        data.map((d) => {
            date = d.date
            switch (name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            let line = computed ? computed.line[name][i] : 0
            dd.push({date, yVal, name, line })
            i++
        })

        return (
            <Card raised style={{ width: 626}}>
                    <Card.Content>
                    <Card.Header>
                            {name}
                    </Card.Header>
                    <div>velocity: {computed ? Math.round((computed.velocity[name][1] * 10) * 100) / 100  + ' mm/yr': 'calculating'}</div>
                    <div>error: +- {computed ? Math.round((computed.std_error[name][0] * 10) * 100) / 100 + ' mm' : 'calculating'}</div>
                        <Dimmer.Dimmable dimmed={true}>
                        <Dimmer active={computed ? false : true} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Button id='resetBtn' size='mini' primary className={name}>reset</Button>
                        <Chart
                            id='chart'
                            type={"custom"}
                            customChart={MyCustomChart}
                            data={dd}
                            styles={styles}
                        />
                        </Dimmer.Dimmable>
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