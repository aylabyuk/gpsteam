import React, { Component } from 'react';
import moment from 'moment'

import { AppBar, Card, CardHeader, CardText, List, ListItem, Dialog, Paper } from 'material-ui'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LogsheetForm from '../logsheet/LogSheetForm'
import { connect } from 'react-redux'

import { setLogsheetMode, reviewLogsheet } from '../../actions/index'
import { apolloClient } from '../../_primary'
import { SingleLogsheetQuery } from '../../gqlFiles/logsheetgql'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// query all sites with logsheet
// get the logsheets date and id
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
    constructor(props) {
        super(props);
        this.state = {
            logsheetDialog: false,
            currentLogsheetToView: null
        };
    }

    handleLogsheetDialog(id) {
        this.setState({ logsheetDialog: true, currentLogsheetToView: id })
        apolloClient.query({query: SingleLogsheetQuery, variables: { currentLogsheet: id }})
            .then((d) => {
                console.log(d)
                this.props.setLogsheetMode("readonly")
                this.props.reviewLogsheet(d.data.singleLogsheet)
            }).catch((err) => console.log(err))

    }

    handleClose() {
        this.setState({ logsheetDialog: false, currentLogsheetToView: null })
    }

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
                                                                            onTouchTap={()=> this.handleLogsheetDialog(l.id)}
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

                    <Dialog repositionOnUpdate={true} autoScrollBodyContent={true} contentStyle={{width: '125%'}} modal={false} open={this.state.logsheetDialog} onRequestClose={()=> this.handleClose()}>
                            <Paper style={{ maxWidth: '1000px', padding: '0px 25px 0px 25px', overflow: 'auto'}}>
                                { this.state.currentLogsheetToView ? <LogsheetForm /> : null }
                            </Paper>
                    </Dialog>

                </div>
            );
        }
    }
}

export default connect(null , { setLogsheetMode, reviewLogsheet })(graphql(SitesWithLogsheetsQuery, {
    options: (ownProps) => ({
        variables: {
            name: [ownProps.site]
        }
    })
})(SiteDetailsDrawer))