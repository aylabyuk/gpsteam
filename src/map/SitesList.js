import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import { ListItem, ListItemText } from 'material-ui/List';
import { List as RVList, AutoSizer } from 'react-virtualized'
import L from 'leaflet'
import { connect } from 'react-redux'
import { setSelectedSite } from './mapActions'

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
  follow: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: '50px',
    height: '50px',
    marginRight:  '12px',
    backgroundColor:  '#000',
    color:  '#FFF',
    zIndex: 5
  }
});

class SitesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
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

  handleClick = (id) => {
    const markers = window.cluster.props.markers
    const marker = markers.find((m) => m.id === id)

    try {
      this.props.setSelectedSite(marker.name)
    } catch (error) {
      console.log(error)
      alert(` This site is not yet mapped It is either a new site or it lacks important details.
        
      Please contact the admin to fix this issue.`)
    }

    
  }

  _onRowsRendered({ startIndex, stopIndex }) {
    console.log(this.state.sites.sites[startIndex].name.charAt(0))
    const el = document.getElementById('siteList')
    let a = el.scrollTop
    let b = el.scrollHeight - el.clientHeight
    let c = a / b

    this.follow.style.setProperty('top', c * el.clientHeight+'px')
    console.log('DOC:', document.getElementById('follow').style.top)
    console.log('REA',this.follow.style.top)
  }

  _noRowsRenderer = () => {
    return <div >No rows</div>;
  }

  _rowRenderer = ({index, isScrolling, key, style}) => {
      const sites = this.state.sites.sites

      return(
        <div key={key} style={style}>
          <ListItem button onClick={() => this.handleClick(sites[index].id)}>
            <ListItemText primary={<strong>{sites[index].name}</strong>} secondary={
                sites[index].surveyType ? 
                <strong style={{ color: sites[index].surveyType.type === 'campaign' ? '#1e9cd8' : '#bf539e' }}>
                  {sites[index].surveyType.type}
                </strong>
                : <strong>unknown</strong>
              } 
            />
          </ListItem>
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
              <div>
                <div id='follow' ref={(f) => { this.follow = f }} className={classes.follow}>test</div>
                <RVList
                  id='siteList'
                  height={height}
                  width={width}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={sites.sites.length}
                  rowHeight={70}
                  rowRenderer={this._rowRenderer}
                  onRowsRendered={this._onRowsRendered.bind(this)}
                  // scrollToIndex={scrollToIndex}
                />
              </div>
            )}
        </AutoSizer>
      </div>
    );
  }
}

SitesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

SitesList = connect(null, { setSelectedSite })(SitesList)

export default withStyles(styles)(SitesList);