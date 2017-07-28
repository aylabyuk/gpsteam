import React, { Component } from 'react';
import { viewSiteDetails } from '../../actions/index'

// ui
import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// server
import { ip, PORT } from '../../_primary'

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

class SitePopup extends Component {



    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card style={{width: '500px'}}>
                         <CardTitle title={this.props.popup.key} /> 
                        <CardText style={{textAlign: 'center'}}>

                            <img id='previewTimeseries' src={'http://'+ ip + PORT + '/timeseries/' + this.props.popup.key + '.jpg' } />


                            {/*<RaisedButton
                                    label="Upload Timeseries Preview for this site"
                                    labelPosition="before"
                                    style={styles.button}
                                    containerElement="label" >
                                <input type="file" id="file-upload" style={styles.exampleImageInput} accept={'image/jpeg,image/png'} required onChange={this.props.newPreview.bind(this)}/>
                            </RaisedButton>*/}
                            
                        </CardText>
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