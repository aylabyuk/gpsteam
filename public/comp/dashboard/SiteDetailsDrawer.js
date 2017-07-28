import React, { Component } from 'react';
import moment from 'moment'

import { AppBar, Card, CardHeader, CardText, List, ListItem } from 'material-ui'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SitesWithLogsheetsQuery = gql`query SitesWithLogsheetsQuery($name: [String!]) {
    sitesWithLogsheet(name: $name) {
        name
        logsheets {
            id
            logsheet_date
        }
    }
}`;
 
class SiteDetailsDrawer extends Component {
    render() {
        let { data, site } = this.props

        if(data.loading || site === "") {
            return <p>loading...</p>
        } else {
            return (
                <div>
                    <AppBar title={this.props.site} iconElementLeft={<IconButton onTouchTap={()=> this.props.close()}><NavigationClose /></IconButton>} />
                    <Card>
                        <CardHeader
                        title="Logsheets"
                        subtitle={data.sitesWithLogsheet[0].logsheets.length + ' entries'}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            {
                                <List>
                                   {
                                       data.sitesWithLogsheet[0].logsheets.map((l) => {
                                           return( <ListItem 
                                            key={l.id}
                                            primaryText={moment(new Date(l.logsheet_date)).format('YYYY MMMM D - dddd')} /> )
                                       })
                                   }
                                </List>
                            }
                        </CardText>
                    </Card>
                </div>
            );
        }
    }
}

export default graphql(SitesWithLogsheetsQuery, {
    options: (ownProps) => ({
        variables: {
            name: [ownProps.site]
        }
    })
})(SiteDetailsDrawer);