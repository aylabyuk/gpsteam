import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { List as RVList, AutoSizer } from 'react-virtualized'

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 64px)'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class SitesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
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
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  _noRowsRenderer = () => {
    return <div >No rows</div>;
  }

  _rowRenderer = ({index, isScrolling, key, style}) => {
      const sites = this.state.sites.sites
      const { classes } = this.props;
      const { expanded } = this.state

      return(
        <div key={key} style={style}>
          <List>
            <ListItem button>
              <ListItemText primary={sites[index].name} secondary={sites[index].surveyType ? sites[index].surveyType.type : 'unknown'} />
            </ListItem>
          </List>
        </div>
      )
  }

  render() {
    const { classes } = this.props;
    const { sites } = this.state;

    return (
      <div className={classes.root}>
        <AutoSizer>
            {({width, height}) => (
              <RVList
                height={height}
                width={width}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={sites.sites.length}
                rowHeight={70}
                rowRenderer={this._rowRenderer}
                // scrollToIndex={scrollToIndex}
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