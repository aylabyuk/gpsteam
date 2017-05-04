import React, { Component } from 'react';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ui
import { AppBar, Card, Paper, LinearProgress,  List, ListItem, Avatar, Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui'
import { blueGrey400, purple800 } from 'material-ui/styles/colors'

const style = {
  margin: 2,
  display: 'inline-block',
  padding: 10
};

const logsheetCreated = gql`
    subscription logsheetCreated {
        logsheetCreated {
            site {
                id
                site_name
                logsheets {
                    id
                    logsheet_date
                }
            }
        }
    }
`;

const SitesWithLogsheetQuery = gql`query SitesWithLogsheetQuery {
	sitesWithLogsheet {
        id
        site_name
        logsheets {
            id
            logsheet_date
        }
	}  
}`;

class LogsheetViewer extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            let { subscribeToMore } = this.props.data
            this.subscription = [
                subscribeToMore({
                    document: logsheetCreated,
                    updateQuery: (previousResult, { subscriptionData }) => {

                        const receivedObject = subscriptionData.data.logsheetCreated
                        const newResult = _.cloneDeep(previousResult)
                        const indexOfSite = newResult.sitesWithLogsheet.map(function(e) { return e.id; }).indexOf(receivedObject.site.id);

                        const logsheetToInsert = _.maxBy(receivedObject.site.logsheets, (o) => {
                            return parseInt(o.id);
                        })

                        if(indexOfSite < 0) {
                            newResult.sitesWithLogsheet.push(receivedObject.site)
                        } else {
                            newResult.sitesWithLogsheet[indexOfSite].logsheets.push(logsheetToInsert)
                        }

                        return newResult
                    },
                })
            ]
        }
    }

    handleLogsheetViewer(id) {
        this.props.handleChange(1)
        console.log(id)
    }

    render() {
        let { loading, sitesWithLogsheet } = this.props.data

        if(loading) {
            return <LinearProgress mode="indeterminate" />
        } else {
            return (
                <div>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Sites with Logsheets" />
                        </ToolbarGroup>
                    </Toolbar>
                    <List>
                        { sitesWithLogsheet.map((s)=> {
                            return(
                                <ListItem 
                                    key={s.id}
                                    primaryText={s.site_name}
                                    secondaryText={ s.logsheets.length + ' logsheets' }
                                    initiallyOpen={false}
                                    nestedItems={ 
                                        s.logsheets.map((l)=> {
                                            let ldate = new Date(l.logsheet_date)
                                            return(
                                                <ListItem
                                                    key={l.id}
                                                    primaryText={ ldate.toDateString() } 
                                                    onTouchTap={ () => this.handleLogsheetViewer(l.id) } />
                                            )
                                        })
                                    }
                                />
                            )
                        }) }
                    </List>
                </div>
            );
        }
    }
}

export default graphql(SitesWithLogsheetQuery)(LogsheetViewer);