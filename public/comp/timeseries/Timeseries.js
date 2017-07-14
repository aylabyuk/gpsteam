import React, { Component } from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'

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

class Timeseries extends Component {   
    
    render() {

        let { name, data, earthquake, before, after } = this.props
        let dd = [], date, yVal
        
        data.map((d) => {
            date = d.date
            switch (name) {
                case 'east': yVal = d.east; break;
                case 'north': yVal = d.north; break;
                case 'up': yVal = d.up; break;
            }
            dd.push({date, yVal})
        })

        if(before && after){

            let i = 0

            dd.lineBefore = []
            dd.lineAfter = []

            before[name].map((d) => {
                dd.lineBefore.push([data[i].date, d ])
                i++
            })

            after[name].map((d) => {
                dd.lineAfter.push([data[i].date, d ])
                i++
            })

        }

        if(!earthquake && before){
            let i = 0

            dd.lineBefore = []
            dd.lineAfter = []

            before[name].map((d) => {
                dd.lineBefore.push([data[i].date, d ])
                i++
            })
        }

        dd.name = name
        dd.earthquake = earthquake

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