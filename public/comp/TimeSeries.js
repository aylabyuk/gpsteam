import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './m/MyCustomChart'

//ui
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const style = {
  margin: 10,
  padding: 6,
  width: 600
};

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
            <Paper style={style}>
                <h2>{name}</h2>
                <div>velocity: {computed ? Math.round((computed.velocity[name][1] * 10) * 100) / 100  + ' mm/yr': 'calculating'}</div>
                <div>error: +- {computed ? Math.round((computed.std_error[name][0] * 10) * 100) / 100 + ' mm' : 'calculating'}</div>
                <FlatButton id='resetBtn' className={name} label='reset' primary={true} />
                <Chart
                    id='chart'
                    type={"custom"}
                    customChart={MyCustomChart}
                    data={dd}
                    styles={styles}
                />
            </Paper>
        );
    }
}

function mapStateToProps(state) {  
  return {
    computed: state.plot.computed
  };
}

export default connect(mapStateToProps)(TimeSeries);