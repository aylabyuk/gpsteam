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

let requestForLine = (data) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4040/line/compute`, {
            params: {
                data: data
            }
        })
            .then((response) => {
                resolve(response.data.line)
            })
            .catch(function (error) {
                reject(Error(error))
            });

    });
}

class TimeseriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { date: 0, east: 0, north: 0, up: 0 },
            ],
            sitename: 'SITE',
            earthquake: 2017.1123,
            linesBefore_enu: null,
            linesAfter_enu: null,
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

    requestLines() {
        let { data, earthquake } = this.state

        let dataBeforeEarthquake = [],
            dataAfterEarthquake = []

        data.map((d) => {
            if(d.date < earthquake) {
                dataBeforeEarthquake.push(d)
            } else {
                dataAfterEarthquake.push(d)
            }
        })

        if(dataBeforeEarthquake.length != 0 && dataAfterEarthquake.length != 0) {
            requestForLine(dataBeforeEarthquake)
                .then((lines) => {
                    this.setState({ linesBefore_enu: lines })
                })

            requestForLine(dataAfterEarthquake)
                .then((lines) => {
                    this.setState({ linesAfter_enu: lines })
                })
        }

    }

    requestLineNoEq() {
        let { data } = this.state

        requestForLine(data)
            .then((lines) => {
                this.setState({ linesBefore_enu: lines })
            })

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
            sitename: file.name,
            linesBefore_enu: null,
            linesAfter_enu: null,
         })

    }

    handleDotsOpacity = (event, value) => {
        let dots = d3.selectAll('svg').selectAll('.dots').selectAll('circle').style("opacity", value)            
    };

    render() {
        let { data, earthquake, linesAfter_enu, linesBefore_enu, sitename, width, height, dotsOpacity } = this.state
        let { enu_distance } = this.props

        return (
            <Paper style={{ width: width, height: height }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: height }}>
                    <Paper>
                        <div style={styles.center}>
                            <h2 style={{ margin: 0 }}>{sitename}</h2>
                            <Timeseries data={data} earthquake={earthquake} before={linesBefore_enu} after={linesAfter_enu} name='north'/>
                            <Timeseries data={data} earthquake={earthquake} before={linesBefore_enu} after={linesAfter_enu} name='east'/>
                            <Timeseries data={data} earthquake={earthquake} before={linesBefore_enu} after={linesAfter_enu} name='up'/>
                        </div>
                    </Paper>
                    <div style={{ ...styles.right, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div>
                            <p>dots opacity: {this.state.dotsOpacity}</p>
                            <Slider value={this.state.dotsOpacity} onChange={this.handleDotsOpacity} />
                        </div>
                        <TextField fullWidth floatingLabelText='Earthquake date' hintText='2017.1123' defaultValue='2017.1123' onChange={(e, val) => this.setState({ earthquake: val })} />
                        <RaisedButton
                            primary
                            label="Show Displacement"
                            style={styles.button}
                            onTouchTap={() => earthquake ? this.requestLines() : this.requestLineNoEq()} />
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