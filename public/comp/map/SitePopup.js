import React, { Component } from 'react';

import { Card, CardHeader, CardTitle, CardActions, CardText, FlatButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SitePopup extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card>
                        <CardHeader
                        title={this.props.popup.position.lat + ', ' + this.props.popup.position.lng}
                        subtitle="Campaign Survey"
                        />
                        <CardTitle title={this.props.popup.key} subtitle="48 Address Example, Test City" />
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                        <CardActions>
                            <FlatButton label="View Info" onClick={() => console.log("test")}/>
                            <FlatButton label="Close" onClick={() => this.props.remove()}/>
                        </CardActions>
                    </Card>
                    <center><div className="arrow-down" /></center>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default SitePopup;