import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ui
import { AppBar, Card, Paper, LinearProgress,  List, ListItem, Avatar, IconButton} from 'material-ui'
import { blueGrey400, purple800 } from 'material-ui/styles/colors'
import { AutoSizer } from 'react-virtualized'
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import { toggleLogsheetViewerDrawer } from '../../actions/index'

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
                name
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
        name
        logsheets {
            id
            logsheet_date
        }
	}  
}`;

class LogsheetViewer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.data.sitesWithLogsheet != nextProps.data.sitesWithLogsheet) {
            return true
        }
        return false
    }
    

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

                            // sort alphabetically via sitename
                            newResult.sitesWithLogsheet.sort((a,b) => {
                                let siteA = a.name
                                let siteB = b.name
                                return (siteA < siteB) ? -1 : (siteA > siteB) ? 1 : 0
                            })

                        } else {
                            newResult.sitesWithLogsheet[indexOfSite].logsheets.push(logsheetToInsert)
                        }

                        // console.log('prev', previousResult)
                        // console.log('subscription data', subscriptionData)
                        // console.log('new', sortedResult)
                        return newResult
                    },
                })
            ]
        }
    }

    handleLogsheetViewer(id) {
        this.props.handleChange(2, id)
    }

    render() {
        let { loading, sitesWithLogsheet } = this.props.data

        if(loading) {
            return <LinearProgress mode="indeterminate" />
        } else {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
                    <AppBar style={{ flex: '0 0 auto' }} iconElementRight={ <IconButton onTouchTap={()=> this.props.toggleLogsheetViewerDrawer()}><NavigationClose /></IconButton> }/>
                    <Paper style={{ flex: '1 1 auto', position: 'relative', overflowY: 'auto' }}>
                        <List>
                            { sitesWithLogsheet.map((s)=> {

                                let years = []
                                let sortedLogsheets = []

                                s.logsheets.map((l) => {
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

                                return(
                                    <ListItem
                                        key={s.id}
                                        primaryText={s.name}
                                        secondaryText={ sortedLogsheets.length + ' logsheets' }
                                        initiallyOpen={false}
                                        primaryTogglesNestedList={true}
                                        nestedItems={ 
                                            years.map((y) => {
                                                return(
                                                    <ListItem
                                                        key={y}
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
                                                                            onTouchTap={ () => this.handleLogsheetViewer(l.id) }
                                                                        />
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    />
                                                )
                                            })
                                        }
                                    />
                                )
                            }) }
                        </List>
                    </Paper>
                </div>
            );
        }
    }
}

export default connect( null, { toggleLogsheetViewerDrawer })(graphql(SitesWithLogsheetQuery)(LogsheetViewer));