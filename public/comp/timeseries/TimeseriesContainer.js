import React, { Component } from 'react';

import Timeseries from './Timeseries'

// ui
import { AppBar, Paper, Drawer, RaisedButton} from 'material-ui'
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
};

class TimeseriesContainer extends Component {

    handleUpload({target}) {
        
        let file = target.files[0];
        let reader = new FileReader();

        let jsonFile = []

        reader.onload = (event) => {

            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);

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

            console.log(jsonFile);

        };

        reader.onerror = (evt) => {
            alert(evt.target.error.name);
        };

        reader.readAsText(file);

    }
   
    render() {

        return (
            <Paper style={{height: window.innerHeight}}>
                <AppBar title="Timeseries"  />

                <RaisedButton
                        label="Upload"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label" >
                    <input type="file" id="file-upload" style={styles.exampleImageInput} accept={'*'} required onChange={this.handleUpload}/>
                </RaisedButton>

                <Timeseries />
            </Paper>
        );
    }
}

export default TimeseriesContainer;