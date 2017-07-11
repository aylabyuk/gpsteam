import React, { Component } from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'
import MyCustomChart from './MyCustomChart'

//ui
import Paper from 'material-ui/Paper';
import styles from '../../css/chart.css'


const style = {
  margin: 2,
  padding: 2,
  width: 1330,
  height: 310,
};

class Timeseries extends Component {

    render() {

        let { name, data } = this.props
        let dd = [], date, yVal, i = 0
        
        data.map((d) => {
            date = d.date
            switch (name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            dd.push({date, yVal, name })
            i++
        })

        return (
            <Paper style={style}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}>
                    <p style={{ verticalAlign: 'text-top', transform: 'rotate(-90deg)', height: 20 }}>{name}(cm)</p>
                    <Chart
                        id='chart'
                        type={"custom"}
                        customChart={MyCustomChart}
                        data={dd}
                        styles={styles}
                    />
                </div>
                <p style={{margin: 0}}>year</p>
            </Paper>
        );
    }
}

export default Timeseries;