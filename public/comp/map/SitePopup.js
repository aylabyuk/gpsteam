import React, { Component } from 'react';
import { viewSiteDetails } from '../../actions/index'

// ui
import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// server
import { ip, PORT } from '../../_primary'


// set the styles for the popup component
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

// the popup key is the sitename for the marker passed as title to the CardTitle of this component
class SitePopup extends Component {
    render() {
        return (

            // use the MuiThemeProvider here since leaflet requires it in using react-leaflet
            // https://stackoverflow.com/questions/38934580/how-to-replace-react-leaflet-popup-with-custom-component
            <MuiThemeProvider>
                <div>
                    <Card style={{width: '500px'}}>
                         <CardTitle title={this.props.popup.key} /> 
                        <CardText style={{textAlign: 'center'}}>

                            {/* this is the actual timeseries jpg image. It uses the popup key to get the src image */}
                            <img id='previewTimeseries' src={'http://'+ ip + PORT + '/timeseries/' + this.props.popup.key + '.jpg' } />


                            {/*<RaisedButton
                                    label="Upload Timeseries Preview for this site"
                                    labelPosition="before"
                                    style={styles.button}
                                    containerElement="label" >
                                <input type="file" id="file-upload" style={styles.exampleImageInput} accept={'image/jpeg,image/png'} required onChange={this.props.newPreview.bind(this)}/>
                            </RaisedButton>*/}
                            
                        </CardText>
                        {/* display the action buttons for viewing the site details and closing the popup */}
                        <CardActions>
                            <FlatButton primary label="View Details" onClick={() => this.props.handleViewDetails(this.props.popup.key) }/>
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