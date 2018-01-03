import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { List, AutoSizer } from 'react-virtualized'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class SitesList extends React.Component {
  state = {
    expanded: null,
    sites: client.readQuery({
        query: gql`
            {
                sites {
                    id
                    name
                    description
                    location
                    longitude
                    latitude
                    surveyType {
                        type
                    }
                }
            }
        `
        })
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  _noRowsRenderer() {
    return <div >No rows</div>;
  }

  _rowRenderer({index, isScrolling, key, style}) {
    const { sites } = this.state.sites
  }

  render() {
    const { classes } = this.props;
    const { expanded, sites } = this.state;

    console.log(sites)

    return (
      <div className={classes.root}>
        <AutoSizer disableHeight>
            {({width}) => (
              <List
                ref="List"
                height={300}
                overscanRowCount={10}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={sites.sites.length}
                rowHeight={100}
                rowRenderer={this._rowRenderer}
                // scrollToIndex={scrollToIndex}
                width={width}
              />
            )}
        </AutoSizer>
      </div>
    );
  }
}

SitesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SitesList);