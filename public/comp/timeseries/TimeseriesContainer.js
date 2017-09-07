import React, { Component } from 'react';
import axios from 'axios'
import * as d3 from "d3";

import Timeseries from './Timeseries'

// ui
import { AppBar, Paper, Drawer, RaisedButton, TextField, Slider } from 'material-ui'
import { AutoSizer } from 'react-virtualized'

// timeseries container styling
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

// Use the axios library to request data to the server with the "position data" as the parameter
// The response will be a json file of regression line, errors and velocity for north, east and up components
let requestForLine = (data) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4040/line/compute`, {
            params: {
                data: data
            }
        })
            .then((response) => {
                console.log(response.data)
                resolve(response.data)
            })
            .catch(function (error) {
                reject(Error(error))
            });

    });
}

// This component is the parent component for all the timeseries.. east, north and up
// data is provided by graphql and then processed to "/compute" endpoint to get the linear regression of the scatterplot
class TimeseriesContainer extends Component {
    constructor(props) {
        super(props);
        // initialize data before rendering
        // you can change minXval and maxXval to other year values
        this.state = {
            data: [
                { date: 0, east: 0, north: 0, up: 0 },
            ],
            sitename: 'SITE',
            minXval: 2004,
            maxXval: 2018,
            earthquake: '',
            ymarginal: 0.8,
            line: null,
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    // when the browser resizes call setState to update the width and the height of the component
    updateDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    // before rendering the component get first the initial dimension
    componentWillMount() {
        this.updateDimensions()
    }

    // add the "resize" event listener to the component after mounting
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    // remove the listener from the component when unmounted
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    // Use this method to request the linear regression data plots
    requestLines() {
        let { data, earthquake } = this.state

        // If there is no earthquake date provided disregard the remaining processes (return 0)
        if(earthquake === '') { return 0 }

        let dataBeforeEarthquake = []

        // get all the data with dates before the earthquake and the push it to the dataBeforeEarthquake array
        data.map((d) => {
            if(d.date < earthquake) {
                dataBeforeEarthquake.push(d)
            }
        })

        // If dataBeforeEarthquake contains values we must call the requestForLine function
        // the response of this request is the new value for the "line" state
        if(dataBeforeEarthquake.length != 0) {
            requestForLine(dataBeforeEarthquake)
                .then((d) => {
                    this.setState({ line: d.line })
                })
        }
    }

    // this function will run when the user clicks the upload button
    handleUpload({ target }) {

        // Target is the input file element (html5 element) that triggered the event.
        // When the user clicked the desired position file, the file will become available on the first element in the target.files array
        let file = target.files[0];
        let reader = new FileReader();

        // We must convert the text file uploaded to a js readable format/json (javascript object notation)
        // All the returned data will be stored in jsonFile array
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

            // sort data according to date values 
            jsonFile.sort((a, b) => {
                return a.date - b.date
            })

            // set the jsonFile as the data state for this component
            this.setState({ data: jsonFile })

        };

        // error handling
        reader.onerror = (evt) => {
            alert(evt.target.error.name);
        };

        // Read the content of the file as a text or a series of strings
        reader.readAsText(file);

        // reinitialize the state
        this.setState({ 
            sitename: file.name,
            line: null
         })

    }

    // This function will use "d3" object to control the opacity of the scatterplot by selecting all svg elements that has the ".dots" classname
    // the value will also be stored to the "window" global object
    handleDotsOpacity = (event, value) => {
        let dots = d3.selectAll('svg').selectAll('.dots').selectAll('circle').style("opacity", value)
        window.timeseriesUiState.dotsOpacity = value
    };

    // change the ymarginal state's value to adjust the y range of a timeseries graph
    handleYmarginal = (event, value) => {
        this.setState({ ymarginal: value })
    }

    // The TimeseriesContainer will render 3 important child components. A timeseries for north, east and up
    // each child component will receive props from the state of the parent component
    /*
    Timeseries props

        line = linear regression line (y values) resulted by calling the requestForLine function
        data = json object converted from the uploaded position file
        margin = value of the y margin (top and bottom) of the timeseries scatterplot
        maxXval = maximum x value defined by user or the ending date of the scatterplot
        minXval = minimum x value defined by user of the starting date of the scatterplot
        earthquake = date defined by user. Assigned as the earthquake actual date and time
            required to compute the displacement of the timeseries
        name = required field, either east, north or up

    */
    render() {
        let { data, earthquake, sitename, line, width, height, dotsOpacity, maxXval, minXval, ymarginal } = this.state

        return (
            <Paper style={{ width: width, height: height }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: height }}>
                    <Paper>
                        <div style={styles.center}>
                            <h2 style={{ margin: 0 }}>{sitename}</h2>
                            <Timeseries line={line ? line['north'] : null} data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='north'/>
                            <Timeseries line={line ? line['east'] : null} data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='east'/>
                            <Timeseries line={line ? line['up'] : null} data={data} margin={ymarginal} maxXval={maxXval} minXval={minXval} earthquake={earthquake} name='up'/>
                        </div>
                    </Paper>
                    <div style={{ ...styles.right, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div>
                            {/* slider control for dots opacity */}
                            <p>dots opacity</p>
                            <Slider defaultValue={1} onChange={this.handleDotsOpacity} />
                        </div>

                        <div>
                            {/* slider control for yaxis margin */}
                            <p>Yaxis margin</p>
                            <Slider value={this.state.ymarginal} onChange={this.handleYmarginal} max={2} min={0}/>
                        </div>
                        
                        {/* user can define the minXval, maxXval and earthquake date */}
                        <TextField fullWidth floatingLabelText='Minimum Xaxis value' hintText='2004' defaultValue='2004' onChange={(e, val) => this.setState({ minXval: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        <TextField fullWidth floatingLabelText='Maximum Xaxis value' hintText='2018' defaultValue='2018' onChange={(e, val) => this.setState({ maxXval: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        <TextField fullWidth floatingLabelText='Earthquake date' hintText='e.g. 2017.1123' defaultValue='' onChange={(e, val) => this.setState({ earthquake: val })} 
                            disabled={ data.length == 1 ? true : false }/>
                        
                        {/* 
                            when user clicks this button requestLine() will be triggered which also triggers requestForLines().
                            if line data is available the line state will change and the timeseries components will render the line

                         */}
                        <RaisedButton
                            primary
                            label="Show Displacement"
                            style={styles.button}
                            onTouchTap={() => this.requestLines()} />

                        {/* New data results will rerender the whole component to display a new set of data. */}
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