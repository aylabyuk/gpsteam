import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import { List as RVList, AutoSizer } from 'react-virtualized'
import L from 'leaflet'
import { connect } from 'react-redux'
import { setSelectedSite } from './mapActions'

import Follow from '../follow.svg'

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
    marginRight:  '40px',
    marginTop: '5px',
    backgroundColor:  '#FFF',
    color:  '#FFF',
    zIndex: 5
  },
  followIcon: {
    transform: 'scaleY(-1)',
    filter: 'FlipV'
  }
});

class SitesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLetter: 'A',
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
    let letter = this.state.sites.sites[startIndex].name.charAt(0)
    this.setState({ currentLetter: letter })
    const el = document.getElementById('siteList')
    let a = el.scrollTop
    let b = el.scrollHeight - el.clientHeight
    let c = a / b

    let half =  el.clientHeight / 2
    let current =  c * el.clientHeight

    this.follow.style.setProperty('top', current+'px')

    if(current <= 90) {
      console.log(1)
      this.followIcon.style.setProperty('transform', 'scaleY(-1)')
      this.followIcon.style.setProperty('filter', 'FlipV')
      this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    } else {
      console.log(2)
      this.followIcon.style.setProperty('transform', 'scaleY(1)')
      this.follow.style.setProperty('top', current-90+'px')
      this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    }
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
                <div id='follow' ref={(f) => { this.follow = f }} className={classes.follow}>
                  <img ref={(f) => { this.followIcon = f }} width={80} height={80} src={Follow} />
                  <Avatar style={{top: -75, left: 10 ,width: 60, height: 60, backgroundColor: '#3a4aa6', fontSize: 50}}>
                    {this.state.currentLetter}
                  </Avatar>
                </div>
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