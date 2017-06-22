import React, { Component } from 'react';

// ui
import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// server
import { ip, PORT } from '../../_primary'

class SitePopup extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card style={{width: '500px'}}>
                        <CardHeader
                        title={this.props.popup.position.lat + ', ' + this.props.popup.position.lng}
                        subtitle="Campaign"
                        />
                        <CardTitle title={this.props.popup.key} subtitle="48 Address Example, Test City" />
                        <CardText>


                            <img id='previewTimeseries' src={'http://'+ ip + PORT + '/timeseries/' + this.props.popup.key + '.jpg' } />
                            <center><label htmlFor="file-upload" className="custom-file-upload">
                                Upload Timeseries Preview for this site
                            </label></center>
                            <input type='file' id="file-upload" accept={'image/jpeg,image/png'} required onChange={this.props.newPreview.bind(this)} /> 
                            
                        </CardText>
                        <CardActions>
                            <FlatButton primary label="View Details" onClick={() => console.log("test")}/>
                            <FlatButton secondary label="Close" onClick={() => this.props.remove()}/>
                        </CardActions>
                    </Card>
                    <center><div className="arrow-down" /></center>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default SitePopup;