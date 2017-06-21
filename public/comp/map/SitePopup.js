import React, { Component } from 'react';
import { apolloClient } from '../../_primary' 

// graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ui
import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// server
import { ip, PORT } from '../../_primary'

const uploadPreview = gql`
    mutation updateSiteTimeseriesPreview(
        $siteName: String!,
        $timeseriesPreview: File!
    ) {
        updateSiteTimeseriesPreview(siteName: $siteName, timeseriesPreview: $timeseriesPreview)
        {
            id
            name
        }
    }
`

const getPreview = gql`
    query siteTimeseriesPreview(
        $name: String!
    ) {
        siteTimeseriesPreview(name: $name) {
            path
            type
            name
            size
        }
    }
`

class SitePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name: null,
        };
    }

    handleNewPreview({target}) {
        console.log('saving file', target.files[0])
        apolloClient.mutate({mutation: uploadPreview, variables: { siteName: this.props.popup.key, timeseriesPreview: target.files[0] } })
            .then((d) => {
                this.setState({ name: d.data.updateSiteTimeseriesPreview.name })
            }).catch((err) => {
                console.log(err)
            })
    }

    requestForPreview() {
        let preview = apolloClient.query({query: getPreview, variables: { name: this.props.popup.key } })

        preview.then((d) => {
            if(d.data.siteTimeseriesPreview) {
                this.setState({ name: d.data.siteTimeseriesPreview.name })
            }
        })
    }

    componentDidMount() {
        this.requestForPreview()
    }

    
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
                            { this.state.name ? <img id='previewTimeseries' src={'http://'+ ip + PORT + '/timeseries/' + this.state.name } /> : 
                            <div>
                                <center><label htmlFor="file-upload" className="custom-file-upload">
                                    Upload Timeseries Preview for this site
                                </label></center>
                                <input type='file' id="file-upload" accept={'image/jpeg,image/png'} required onChange={this.handleNewPreview.bind(this)} /> 
                            </div> } 
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