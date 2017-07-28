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

            let years = []
            let sortedLogsheets = []

            data.sitesWithLogsheet[0].logsheets.map((l) => {
                return sortedLogsheets.push(l)
            })

            sortedLogsheets.sort((a,b) => {
                a = new Date(a.logsheet_date);
                b = new Date(b.logsheet_date);
                return a>b ? -1 : a<b ? 1 : 0;
            })

            sortedLogsheets.map((l)=> {
                let ldate = new Date(l.logsheet_date)
                if(!years.includes(ldate.getFullYear())) {
                    years.push(ldate.getFullYear())
                }
            })

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
                                        years.map((y) => {
                                            return(
                                                <ListItem key={y}
                                                    primaryText={y} 
                                                    initiallyOpen={false}
                                                    primaryTogglesNestedList={true}
                                                    nestedItems={
                                                            sortedLogsheets.map((l,index) => {
                                                                if(new Date(l.logsheet_date).getFullYear() == y) {
                                                                    return(
                                                                        <ListItem
                                                                            key={index}
                                                                            primaryText={moment(new Date(l.logsheet_date)).format('MMMM D - dddd')}
                                                                        />
                                                                    )
                                                                }
                                                            })
                                                        }/>
                                            )
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