import React, { Component } from 'react';
import axios from 'axios'
import * as d3 from "d3";

import Timeseries from './Timeseries'

// ui
import { AppBar, Paper, Drawer, RaisedButton, TextField, Slider } from 'material-ui'
import { AutoSizer } from 'react-virtualized'

const styles = {
    button: {
        margin: 5,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    center: {
        padding: 0,
        flex: '3 0 0',
        textAlign: 'center'
    },
    left: {
        padding: 5,
        flex: '.5 0 0',
    },
    right: {
        padding: 10,
        flex: '.5 0 0',
    }
};

class TimeseriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { date: 0, east: 0, north: 0, up: 0 },
            ],
            sitename: 'SITE',
            minXval: 2004,
            maxXval: 2018,
            earthquake: '',
            ymarginal: 0.8,
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentWillMount() {
        this.updateDimensions()
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    handleUpload({ target }) {

        let file = target.files[0];
        let reader = new FileReader();

        let jsonFile = []

        reader.onload = (event) => {
            const fileres = event.target.result;
            const allLines = fileres.split(/\r\n|\n/);

            // Reading line by line
            allLines.map((line) => {

                var res = line.split(" ");
                res = res.filter((str) => {
                    return /\S/.test(str);
                });

                if (res.length) {
                    jsonFile.push({
                        date: parseFloat(res[0]),
                        east: parseFloat(res[1]),
                        north: parseFloat(res[2]),
                        up: parseFloat(res[3])
                    })
                }
            });

            this.setState({ data: jsonFile })

        };

        reader.onerror = (evt) => {
            alert(evt.target.error.name);
        };

        reader.readAsText(file);
        this.setState({ 
            sitename: file.name
         })

    }

    handleDotsOpacity = (event, value) => {
        let dots = d3.selectAll('svg').selectAll('.dots').selectAll('circle').style("opacity", value)
        window.timeseriesUiState.dotsOpacity = value
    };

    handleYmarginal = (event, value) => {
        this.setState({ ymarginal: value })
    }

    render() {
        let { data, earthquake, sitename, width, height, dotsOpacity, maxXval, minXval, ymarginal } = this.state

        return (
            <Paper style={{ width: width, height: height }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: height }}>
                    <Paper>
                        <div style={styles.center}>
                            <h2 style={{ margin: 0 }}>{sitename}</h2>
                            <Timeseries data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='north'/>
                            <Timeseries data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='east'/>
                            <Timeseries data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='up'/>
                        </div>
                    </Paper>
                    <div style={{ ...styles.right, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div>
                            <p>dots opacity</p>
                            <Slider defaultValue={1} onChange={this.handleDotsOpacity} />
                        </div>

                        <div>
                            <p>Yaxis margin</p>
                            <Slider value={this.state.ymarginal} onChange={this.handleYmarginal} max={2} min={0}/>
                        </div>
                        
                        <TextField fullWidth floatingLabelText='Minimum Xaxis value' hintText='2004' defaultValue='2004' onChange={(e, val) => this.setState({ minXval: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        <TextField fullWidth floatingLabelText='Maximum Xaxis value' hintText='2018' defaultValue='2018' onChange={(e, val) => this.setState({ maxXval: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        <TextField fullWidth floatingLabelText='Earthquake date' hintText='e.g. 2017.1123' defaultValue='' onChange={(e, val) => this.setState({ earthquake: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        
                        <RaisedButton
                            primary
                            label="Change Data"
                            labelPosition="before"
                            style={styles.button}
                            containerElement="label" >
                            <input type="file" id="file-upload" style={styles.exampleImageInput} accept={'*'} required onChange={this.handleUpload.bind(this)} />
                        </RaisedButton>
                    </div>

                </div>
            </Paper>
        );
    }
}

export default TimeseriesContainer;