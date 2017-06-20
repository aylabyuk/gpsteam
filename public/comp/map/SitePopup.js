import React, { Component } from 'react';
import { apolloClient } from '../../_primary' 

// graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ui
import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const uploadPreview = gql`
    mutation updateSiteTimeseriesPreview(
        $siteName: String!,
        $timeseriesPreview: File!
    ) {
        updateSiteTimeseriesPreview(siteName: $siteName, timeseriesPreview: $timeseriesPreview)
        {
            id
        }
    }
`

class SitePopup extends Component {


    handleNewPreview({target}) {
        console.log(target.files[0])
        console.log(this.props)
        apolloClient.mutate({mutation: uploadPreview, variables: { siteName: this.props.popup.key, timeseriesPreview: target.files[0] } })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card>
                        <CardHeader
                        title={this.props.popup.position.lat + ', ' + this.props.popup.position.lng}
                        subtitle="Campaign"
                        />
                        <CardTitle title={this.props.popup.key} subtitle="48 Address Example, Test City" />
                        <CardText>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Upload Timeseries Preview for this site
                            </label>
                            <input type='file' id="file-upload" accept={'image/jpeg,image/png'} required onChange={this.handleNewPreview.bind(this)} />
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