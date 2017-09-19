import React, { Component } from 'react';
import * as d3 from "d3";
import Chart  from 'd3act'

import MyChart from './MyChart'

//ui
import Paper from 'material-ui/Paper';
import styles from '../../css/chart.css'

const style = {
  margin: 2,
  padding: 2,
  width: 1330,
  height: 310,
};

// Timerseries component serves as the container for the Chart component
class Timeseries extends Component {   

    // Before the component rerenders new props we must check for changes in the earthquake date and then adjust the earthquake line(red line) accordingly.
    componentWillUpdate(nextProps, nextState) {
        if(this.props.earthquake != nextProps.earthquake) {
            // e.g. window.charteast is a reference to the timeseries chart for the east component
            window['chart'+this.props.name].drawEarthquake(nextProps.earthquake)
            // set the value of earthquake date.. this will now become available from "window.timeseriesUiState.earthquake"
            window.timeseriesUiState.earthquake = nextProps.earthquake
        }
    }
    
    render() {
        
        let { name, earthquake, data, maxXval, minXval, margin, line } = this.props
        let dd = [], date, yVal
        
        // map the data specific to the name props of the component
        // dd is an array of object [{date, yVal}, {date, yVal}, ... {date, yVal}]
        data.map((d) => {
            date = d.date
            switch (name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            dd.push({date, yVal})
        })

        // supply also the nessesary data inside the "dd" object
        // the dd variable shall contain an array of position data and the following
        dd.name = name 
        dd.maxXval = maxXval
        dd.minXval = minXval
        dd.margin = margin
        dd.line = line

        return (
            <Paper style={style}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}>
                    <p style={{ verticalAlign: 'text-top', transform: 'rotate(-90deg)', height: 20 }}>disp(mm)</p>
                     <Chart
                        id='chart'
                        type={"custom"}
                        customChart={MyChart}
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