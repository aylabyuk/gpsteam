import React, { Component } from 'react';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ui
import { AppBar, Card, Paper, LinearProgress,  List, ListItem, Avatar} from 'material-ui'
import { blueGrey400, purple800 } from 'material-ui/styles/colors'
import { MuiTreeList } from 'react-treeview-mui'

const style = {
  margin: 2,
  display: 'inline-block',
  padding: 10,
  width: '50vw'
};

const logsheetCreated = gql`
    subscription logsheetCreated {
        logsheetCreated {
            site {
                id
                title: site_name
                children: logsheets {
                    id
                    title: logsheet_date
                }
            }
        }
    }
`;

const SitesWithLogsheetQuery = gql`query SitesWithLogsheetQuery {
	sitesWithLogsheet {
        id
        title: site_name
        children: logsheets {
            id
            title: logsheet_date
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

    render() {
        let { loading, sitesWithLogsheet } = this.props.data


        if(loading) {
            return <LinearProgress mode="indeterminate" />
        } else {

            console.log('sitesWithLogsheet', sitesWithLogsheet)

            const flattened = flatten(_.cloneDeep(sitesWithLogsheet));
            console.log('flattened', flattened)

            return (
                <Paper style={style}>
                    <MuiTreeList
                        listItems={flattened}
                        contentKey={'title'} 
                        useFolderIcons={true}
			            haveSearchbar={true} />
                </Paper>
            );
        }
    }
}

const flatten = (list) => {
  const result = [];

  const addItem = (item, parentIndex, depth = 1) => {
    
    item.depth = depth;
    if (parentIndex !== undefined) {
      item.parentIndex = parentIndex;
    }

    const index = result.length;
    result.push(item);

    if (item.children) {
      item.children = item.children.map(c => addItem(c, index, depth + 1));
    }

    return index;
  }

  // Add top-level items
  list.forEach(item => addItem(item));

  return result;
}

export default graphql(SitesWithLogsheetQuery)(LogsheetViewer);