import React, { Component } from 'react';
import axios from 'axios'

import Timeseries from './Timeseries'

// ui
import { AppBar, Paper, Drawer, RaisedButton, TextField} from 'material-ui'
import { AutoSizer } from 'react-virtualized'

const styles = {
  button: {
    margin: 12,
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
                {date: 2011.1862, east: 650064.1380, north: -1533424.5433, up: -222335.9382},
                {date: 2011.1889, east: 650064.1159, north: -1533424.5440, up: -222335.9432},
                {date: 2011.1916, east: 650064.1135, north: -1533424.5387, up: -222335.9439},
                {date: 2011.1944, east: 650064.1207, north: -1533424.5430, up: -222335.9391},
                {date: 2011.1971, east: 650064.1161, north: -1533424.5250, up: -222335.9664},
                {date: 2015.5640, east: 650063.9089, north: -1533424.3976, up: -222335.8077},
                {date: 2015.5667, east: 650063.8879, north: -1533424.4018, up: -222335.8002},
                {date: 2015.5695, east: 650063.8879, north: -1533424.3893, up: -222335.8798},
                {date: 2016.6543, east: 650063.8366, north: -1533424.3673, up: -222335.8386},
                {date: 2016.6571, east: 650063.8405, north: -1533424.3651, up: -222335.8365},
                {date: 2016.6598, east: 650063.8419, north: -1533424.3688, up: -222335.8192},
                {date: 2016.6626, east: 650063.8489, north: -1533424.3658, up: -222335.8102},
            ],
            sitename: 'SITE',
            earthquake: null,
            linesEast: [],
            linesNorth: [],
            linesUp: [],
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
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

    getLines(data) {

       if(this.state.earthquake == null) {
            requestForLine(data).then((line) => {
            this.setState({
                    linesEast: this.state.linesEast.concat([line.east]),
                    linesNorth: this.state.linesNorth.concat([line.north]),
                    linesUp: this.state.linesUp.concat([line.up])
                })
            })
       }
    }

    handleUpload({target}) {
        
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

                if(res.length) {
                    jsonFile.push({ 
                        date:  parseFloat(res[0]),
                        north: parseFloat(res[1]),
                        east: parseFloat(res[2]),
                        up: parseFloat(res[3]) 
                    })
                }
            });    

            this.setState({data: jsonFile})
            // console.log(jsonFile);

            this.getLines(jsonFile)

        };

        reader.onerror = (evt) => {
            alert(evt.target.error.name);
        };

        reader.readAsText(file);

        // console.log(file)
        this.setState({ sitename: file.name })

    }
   
    render() {

        return (
            <Paper style={{width: this.state.width, height: this.state.height}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: this.state.height }}>
                    <Paper>
                        <div style={styles.center}>
                            <h2 style={{margin: 0}}>{this.state.sitename}</h2>
                            <Timeseries data={this.state.data} lines={this.state.linesEast} name='east'/>
                            <Timeseries data={this.state.data} lines={this.state.linesNorth} name='north'/>
                            <Timeseries data={this.state.data} lines={this.state.linesUp} name='up'/>
                        </div>
                    </Paper>

                    <div style={{...styles.right, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <TextField fullWidth floatingLabelText='Earthquake date' hintText='2017.1123' onChange={(e, val)=> this.setState({earthquake: val }) }/>
                        <RaisedButton
                            primary
                            label="Change Data"
                            labelPosition="before"
                            style={styles.button}
                            containerElement="label" >
                                <input type="file" id="file-upload" style={styles.exampleImageInput} accept={'*'} required onChange={this.handleUpload.bind(this)}/>
                        </RaisedButton>
                    </div>

                </div>
            </Paper>
        );
    }
}

export default TimeseriesContainer;